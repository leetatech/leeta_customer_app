import React, {FC, useEffect, useMemo, useState} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import createStyles from './styles';
import ScreenTitle from '../../Components/ScreenTitle/ScreenTitle';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import {
  CANCEL_ICON,
  CARD_ICON,
  CHECKBOX_ICON,
  CYLINDER,
  LOCATION_ICON,
  RIGHT_ICON,
  SUCCESS,
} from '../../Assets/svgImages';
import Fonts from '../../Constants/Fonts';
import {colors} from '../../Constants/Colors';
import Buttons from '../../Components/Buttons/Buttons';
import CustomModal from '../../Components/Modal/CustomModal';
import {Receipt} from '../../Components/Receipt/Receipt';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {checkout} from '../../redux/slices/order/orderServices';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const OrderConfirmation: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showModal, setShowModal] = useState(false);
  const bounceValue = new Animated.Value(1);
  const [viewReceipt, setViewReceipt] = useState(false);
  const {userCart, productId} = useSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useDispatch();

  const handleCloseReceipt = () => {
    setShowModal(false);
    setViewReceipt(false);
  };

  useEffect(() => {
    const bounceAnimation = Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: false,
      }),
    ]);
    Animated.loop(bounceAnimation).start();
    return () => {
      bounceValue.removeAllListeners();
    };
  }, [bounceValue]);

  const animatedStyle = {
    transform: [{scale: bounceValue}],
  };

  const handleModalVisibility = () => {
    setShowModal(true);
  };
  const handleNavigateToHomeScreen = () => {
    setShowModal(false);
    navigation.navigate('BottomNavigator');
  };

  const calculateTotalAmountAndDispatch = () => {
    const totalAmount = userCart!.reduce((total, item) => {
      const numericAmount = parseFloat(item.amount);
      return total + numericAmount;
    }, 0);
    const formattedTotalAmount = `₦${totalAmount.toFixed(2)}`;
    return formattedTotalAmount;
  };

  const handleCheckOut = () => {
    const getTotalWeight = () => {
      return userCart?.reduce((total, item) => {
        const weight = parseFloat(item.weight.replace(' Kg', ''));
        return total + weight;
      }, 0);
    };
    const totalWeight = getTotalWeight();

    const getTotalQuantity = () => {
      return userCart?.reduce((total, item) => {
        const quantity = parseFloat(item.quantity);
        return total + quantity;
      }, 0);
    };
    const totalQuantity = getTotalQuantity();

    const payload = {
      cost: Number(calculateTotalAmountAndDispatch()),
      product_id: productId!,
      quantity: totalQuantity!,
      weight: totalWeight!,
    };

    dispatch(checkout(payload))
      .then(response => {
        // if (response.status === 200) {
        //   handleNavigateToHomeScreen();
        // }
      })
      .catch(error => {
        console.error('Error adding items to cart:', error);
      });
  };

  const renderPaymentMethod = () => (
    <View>
      <Fonts type="boldLightGray">Payment Method</Fonts>
      <View style={styles.payment_container}>
        <View style={styles.checkbox_container}>
          <TouchableOpacity>
            <CHECKBOX_ICON />
          </TouchableOpacity>
          <Fonts type="semiBoldBlack">Pay On Delivery</Fonts>
        </View>
        <TouchableOpacity>
          <CARD_ICON />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDeliveryAddress = () => (
    <View style={styles.card_style}>
      <Fonts type="boldLightGray">Delivery Address</Fonts>
      <View style={styles.payment_container}>
        <View style={styles.checkbox_container}>
          <LOCATION_ICON />
          <View style={styles.address}>
            <Fonts type="boldBlack">Becky Anderson</Fonts>
            <Fonts type="normalGrayText">
              plot 234, adeola odeku Lagos, Nigeria
            </Fonts>
            <Fonts type="normalGrayText">+23456789021</Fonts>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
          <RIGHT_ICON />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrder = () => (
    <View style={styles.card_style}>
      {userCart?.map((item, indx) => {
        return (
          <View style={styles.payment_container} key={indx}>
            <View style={styles.checkbox_container}>
              <CYLINDER />
              <View style={styles.address}>
                <Fonts type="normalBoldText">{item.title}</Fonts>
                <Fonts type="normalGrayText">Type: {item.type}</Fonts>
                <Fonts type="normalGrayText">Weight: {item.weight}</Fonts>
                <View style={styles.amount_container}>
                  <Fonts type="normalGrayText">Amount:</Fonts>
                  <Fonts
                    type="normalGrayText"
                    style={{fontWeight: '800', color: colors.GRAY}}>
                    {`₦${item.amount}`}
                  </Fonts>
                </View>
              </View>
            </View>
          </View>
        );
      })}
      <View style={styles.order_summary_container}>
        <Fonts type="boldBlack" style={{paddingBottom: 20}}>
          Summary
        </Fonts>
        <View style={styles.summary_container}>
          <View style={styles.text_spacing}>
            <Fonts type="normalBlackText">Total item costs </Fonts>
            <Fonts type="normalBlackText">Delivery fee</Fonts>
            <Fonts type="normalBlackText">Service fee</Fonts>
          </View>
          <View style={styles.text_spacing}>
            <Fonts type="normalBlackText">
              {calculateTotalAmountAndDispatch()}
            </Fonts>
            <Fonts type="normalBlackText">₦1500</Fonts>
            <Fonts type="normalBlackText">₦25</Fonts>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <>
      <FormMainContainer>
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.main_container}>
            <ScreenTitle
              screenTitle="ORDER CONFIRMATION"
              onPress={navigation.goBack}
            />
            <View>
              {renderPaymentMethod()}
              {renderDeliveryAddress()}
              <Fonts type="boldLightGray" style={{paddingTop: 15}}>
                Your Cart
              </Fonts>
              {renderOrder()}
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Fonts
                  type="boldLightGray"
                  style={{
                    color: colors.ORANGE,
                    textAlign: 'center',
                    paddingVertical: 50,
                  }}>
                  MODIFY CART
                </Fonts>
              </TouchableOpacity>
            </View>
            <View style={styles.terms_container}>
              <Fonts type="smallText">
                If you proceed, you are automatically accepting and acknowledge{' '}
                <Fonts type="smallText" style={{color: colors.ORANGE}}>
                  all terms and policies of Leeta
                </Fonts>
              </Fonts>
              <View style={styles.action}>
                <Fonts type="boldBlack"> Total</Fonts>
                <Fonts type="boldBlack">
                  {calculateTotalAmountAndDispatch()}
                </Fonts>
              </View>
              <Buttons
                title="Checkout"
                disabled={false}
                textStyle={undefined}
                buttonStyle={undefined}
                onPress={handleCheckOut}
              />
            </View>
          </View>
        </ScrollView>
      </FormMainContainer>
      <CustomModal visible={showModal} style={styles.modal_container}>
        {viewReceipt && (
          <>
            <View style={[styles.close_container]}>
              <Fonts
                type="boldBlack"
                style={{color: colors.DBLACK, fontSize: 25}}>
                Receipt
              </Fonts>
              <TouchableOpacity onPress={handleCloseReceipt}>
                <CANCEL_ICON />
              </TouchableOpacity>
            </View>
            <ScrollView
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}>
              <Receipt />
            </ScrollView>
          </>
        )}
        {!viewReceipt && (
          <FormMainContainer>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.close_icon}>
              <CANCEL_ICON />
            </TouchableOpacity>
            <View style={styles.success_msg_container}>
              <View style={styles.iconContainer}>
                <Animated.View style={[animatedStyle]}>
                  <SUCCESS />
                </Animated.View>
              </View>
              <Fonts type="boldBlack" style={styles.refill_msg}>
                THANKS
              </Fonts>
              <Fonts
                type="normalGrayText"
                style={[styles.refill_msg, styles.letter_spacing]}>
                YOUR REFILL IS ON THE WAY
              </Fonts>
            </View>
            <View style={styles.button_container}>
              <Buttons
                title="Back To Homescreen"
                disabled={false}
                buttonStyle={undefined}
                textStyle={{fontSize: 17}}
                onPress={handleNavigateToHomeScreen}
              />
              <Buttons
                title="View Receipt"
                disabled={false}
                buttonStyle={styles.view_receipt_btn}
                textStyle={styles.view_receipt_text}
                onPress={() => setViewReceipt(true)}
              />
            </View>
          </FormMainContainer>
        )}
      </CustomModal>
    </>
  );
};

export default OrderConfirmation;
