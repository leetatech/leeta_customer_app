import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, TouchableOpacity, View, Image, Easing} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import createStyles from './styles';
import ScreenTitle from '../../Components/ScreenTitle/ScreenTitle';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import {
  ALMOST_DONE,
  CARD_ICON,
  CYLINDER,
  LOCATION_ICON,
  RIGHT_ICON,
  SUCCESS,
} from '../../Assets/svgImages';
import Fonts from '../../Constants/Fonts';
import {colors} from '../../Constants/Colors';
import Buttons from '../../Components/Buttons/Buttons';
import CustomModal from '../../Components/Modal/CustomModal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {CartItemResponsePayload} from '../../redux/slices/order/types';
import {
  triggerCartList,
  triggerCheckout,
} from '../../redux/slices/order/orderServices';
import CustomLoader from '../../Components/Loader/CustomLoader';
import {setUserCartId} from '../../redux/slices/order/orderSlice';
import {ADD} from '../../Assets';
import {capitalizeFirstLetter} from '../../utils';
import CustomToast from '../../Components/Toast/CustomToast';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  deliveryCost?: number | null;
}
interface Order {
  cartList: CartItemResponsePayload;
  sumAllOrders: () => string;
  serviceFeePerOrder: number;
  deliveryFeePerOrder: number;
}

const RenderDeliveryAddress: FC<IProps> = ({navigation, deliveryCost}) => {
  const styles = useMemo(() => createStyles(), []);
  const {userDeliveryInformation} = useSelector(
    (state: RootState) => state.order,
  );
  return (
    <View style={styles.card_style}>
      <Fonts type="boldLightGray">Delivery Address</Fonts>
      {deliveryCost ? (
        <View style={styles.payment_container}>
          <View style={styles.checkbox_container}>
            <LOCATION_ICON />
            <View style={styles.address}>
              <Fonts type="boldBlack">
                {userDeliveryInformation.contactName}
              </Fonts>
              <Fonts type="normalGrayText">
                {userDeliveryInformation.address}
              </Fonts>
              <Fonts type="normalGrayText">
                {capitalizeFirstLetter(userDeliveryInformation.userState)}{' '}
                Nigeria
              </Fonts>
              <Fonts type="normalGrayText">
                {userDeliveryInformation.phoneNumber}
              </Fonts>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
            <RIGHT_ICON />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.checkbox_container}>
          <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
            <Image source={ADD} />
          </TouchableOpacity>
          <Fonts type="boldBlack">Add address</Fonts>
        </View>
      )}
    </View>
  );
};

const RenderOrder = ({
  cartList,
  sumAllOrders,
  serviceFeePerOrder,
  deliveryFeePerOrder,
}: Order) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={styles.card_style}>
      {cartList.data ? (
        <>
          {cartList?.data!.cart_items?.map((item, indx) => {
            return (
              <View style={styles.payment_container} key={indx}>
                <View style={styles.checkbox_container}>
                  <CYLINDER />
                  <View style={styles.address}>
                    <Fonts type="normalBoldText">Max Gas</Fonts>
                    <Fonts type="normalGrayText">Type: Refill</Fonts>
                    <Fonts type="normalGrayText">Weight: {item.weight}</Fonts>
                    <View style={styles.amount_container}>
                      <Fonts type="normalGrayText">Amount:</Fonts>
                      <Fonts
                        type="normalGrayText"
                        style={{fontWeight: '800', color: colors.GRAY}}>
                        {`₦${item.cost}`}
                      </Fonts>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </>
      ) : (
        <></>
      )}

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
            <Fonts type="normalBlackText">{sumAllOrders()}</Fonts>
            <Fonts type="normalBlackText">₦{deliveryFeePerOrder}</Fonts>
            <Fonts type="normalBlackText">₦{serviceFeePerOrder}</Fonts>
          </View>
        </View>
      </View>
    </View>
  );
};

const RenderPaymentMethod = () => {
  const styles = useMemo(() => createStyles(), []);
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(false);

  const selctedPaymentMethod = () => {
    setSelectPaymentMethod(!selectPaymentMethod);
  };
  return (
    <View>
      <Fonts type="boldLightGray">Payment Method</Fonts>
      <View style={styles.payment_container}>
        <View style={styles.checkbox_container}>
          <TouchableOpacity onPress={selctedPaymentMethod}>
            <Fontisto
              name={selectPaymentMethod ? 'check' : 'checkbox-passive'}
              size={10}
              style={{
                color: selectPaymentMethod ? colors.ORANGE : colors.BLACK,
              }}
            />
          </TouchableOpacity>
          <Fonts type="semiBoldBlack">Pay On Delivery</Fonts>
        </View>
        <TouchableOpacity>
          <CARD_ICON />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OrderConfirmation: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [viewReceipt, setViewReceipt] = useState(false);
  const [orderSummary, setOrderSummary] = useState<number>(0);
  const {
    cartData,
    cartList,
    userLga,
    userState,
    userDeliveryFee,
    userDeliveryInformation,
    loading,
    serviceFeePerOrder,
  } = useSelector((state: RootState) => state.order);
  const [showCheckoutMsg, setShowCheckoutMsg] = useState(false);
  const dispatch = useDispatch();
  const rotateValue = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
   
        useNativeDriver: true,
      }),
    ).start();
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{rotate: spin}],
  };

  const sumAllOrders = () => {
    const totalAmount = cartData?.data?.cart_items.reduce((total, item) => {
      return total + item.cost;
    }, 0);
    const formattedTotalAmount = `₦${totalAmount?.toFixed(2)}`;
    return formattedTotalAmount;
  };

  const getOrderSummary = () => {
    const totalCartAmount =
      cartData?.data?.cart_items.reduce((total, item) => {
        return total + item.cost;
      }, 0) || 0;
    const deliveryFee = userDeliveryFee || 0;
    const serviceFee = serviceFeePerOrder || 0;
    const total = totalCartAmount + deliveryFee + serviceFee;
    setOrderSummary(total);
  };

  const listCart = () => {
    const payload = {
      paging: {
        index: 0,
        size: 10,
      },
    };
    dispatch(triggerCartList(payload))
      .then(response => {
        const result = response.payload as CartItemResponsePayload;
        if (response && result && result.data) {
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error getting Cart list:', error);
      });
  };
  const getCartid = () => {
    const cartId = cartData?.data?.id;
    dispatch(setUserCartId(cartId));
    return cartId;
  };

  const handleShowModal = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setShowModal(true);
    }, 2000);
  };

  const handleCheckout = async () => {
    if (!cartData?.data?.id && !userLga && !userState) {
      return;
    } else {
      const cartId = cartData?.data?.id;
      const payload = {
        cart_id: cartId as string,
        delivery_details: {
          address: {
            city: userLga as string,
            closest_landmark: '',
            coordinate: {
              latitude: 0,
              longitude: 0,
            },
            full_address: '',
            lga: userLga as string,
            state: userState as string,
            verified: true,
          },
          email: '',
          name: userDeliveryInformation.contactName,
          phone: userDeliveryInformation.phoneNumber,
        },
        delivery_fee: userDeliveryFee!,
        payment_method: 'Pay on delivery',
        service_fee: serviceFeePerOrder,
        total_fee: orderSummary,
      };
      dispatch(triggerCheckout(payload)).then(response => {
        try {
          const result = response.payload as any;
          if (response && result && result.data) {
            setViewReceipt(true);
          } else {
            setShowCheckoutMsg(true);
            setTimeout(() => {
              setShowCheckoutMsg(false);
            }, 2000);
          }
        } catch (error) {
          console.error('Error triggering checkout:', error);
          setShowCheckoutMsg(true);
          setTimeout(() => {
            setShowCheckoutMsg(false);
          }, 2000);
        }
      });
    }
  };

  const viewOrder = () => {
    setShowModal(false);
    navigation.navigate('BottomNavigator');
  };

  const signInToContinue = () => {
    setLoader(true);
    setTimeout(() => {
      setShowModal(false);
      navigation.navigate('SignIn');
    }, 2000);
  };

  useEffect(() => {
    startRotation();
  }, []);

  useEffect(() => {
    listCart();
    getCartid();
    getOrderSummary();
  }, [userDeliveryFee, serviceFeePerOrder]);

  return (
    <>
      <FormMainContainer>
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.main_container}>
            <ScreenTitle
              screenTitle="ORDER CONFIRMATION"
              onPress={navigation!.goBack}
            />
            <View>
              <RenderPaymentMethod />
              <RenderDeliveryAddress
                navigation={navigation}
                deliveryCost={userDeliveryFee}
              />
              <Fonts type="boldLightGray" style={{paddingTop: 15}}>
                Your Cart
              </Fonts>
              <RenderOrder
                cartList={cartList}
                sumAllOrders={sumAllOrders}
                serviceFeePerOrder={serviceFeePerOrder!}
                deliveryFeePerOrder={userDeliveryFee!}
              />
              {loading && <CustomLoader />}
              {loader && <CustomLoader />}
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
                  {userDeliveryFee || serviceFeePerOrder
                    ? orderSummary
                    : sumAllOrders()}
                </Fonts>
              </View>
              <Buttons
                title="Checkout"
                disabled={!userLga || !serviceFeePerOrder}
                textStyle={undefined}
                buttonStyle={undefined}
                onPress={handleShowModal}
              />
            </View>
          </View>
        </ScrollView>
      </FormMainContainer>

      <CustomModal visible={showModal} style={styles.modal_container}>
        {viewReceipt && (
          <>
            <FormMainContainer>
              <View style={styles.success_msg_container}>
                <View style={styles.iconContainer}>
                  {/* <Animated.View style={animatedStyle}> */}
                    <SUCCESS />
                  {/* </Animated.View> */}
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
                  title="View Order"
                  disabled={false}
                  buttonStyle={styles.view_receipt_btn}
                  textStyle={styles.view_receipt_text}
                  onPress={viewOrder}
                />
                  <Buttons
                title="Back to Homescreen"
                disabled={false}
                buttonStyle={undefined}
                textStyle={{fontSize: 17}}
                onPress={()=>navigation.navigate('BottomNavigator')}
              />
              </View>
            </FormMainContainer>
          </>
        )}
        {!viewReceipt && (
          <FormMainContainer>
            <View style={styles.success_msg_container}>
              <View style={styles.iconContainer}>
                <Animated.View style={animatedStyle}>
                  <ALMOST_DONE />
                </Animated.View>
              </View>
              <Fonts type="boldBlack" style={styles.refill_msg}>
                Almost done!
              </Fonts>
            </View>
            <View style={styles.button_container}>
              <Buttons
                title="Sign Out As Guest"
                disabled={false}
                buttonStyle={undefined}
                textStyle={{fontSize: 17}}
                onPress={handleCheckout}
              />
              {loader && <CustomLoader />}
              {loading && <CustomLoader />}
              <Buttons
                title="Sign In To Continue"
                disabled={false}
                buttonStyle={styles.view_receipt_btn}
                textStyle={styles.view_receipt_text}
                onPress={signInToContinue}
              />
            </View>
          </FormMainContainer>
        )}
      </CustomModal>
    </>
  );
};

export default OrderConfirmation;
