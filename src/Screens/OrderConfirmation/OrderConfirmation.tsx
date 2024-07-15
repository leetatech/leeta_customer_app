import React, {FC, useEffect, useMemo, useState} from 'react';
import {Animated, TouchableOpacity, View, Image} from 'react-native';
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
import {
  CartItemResponsePayload,
  FeesResponse,
} from '../../redux/slices/order/types';
import {
  deliveryFee,
  triggerCartList,
  serviceFee,
  triggerCheckout,
} from '../../redux/slices/order/orderServices';
import CustomLoader from '../../Components/Loader/CustomLoader';
import {
  setServiceFee,
  setUserCartId,
} from '../../redux/slices/order/orderSlice';
import CustomToast from '../../Components/Toast/CustomToast';
import {ADD} from '../../Assets';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  deliveryAddress?: number;

}
interface Order {
  cartList: CartItemResponsePayload;
  sumAllOrders: () => string;
  serviceFeePerOrder: number;
  deliveryFeePerOrder: number;
}


const RenderDeliveryAddress: FC<IProps> = ({navigation,deliveryAddress}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={styles.card_style}>
      <Fonts type="boldLightGray">Delivery Address</Fonts>
      {deliveryAddress ? (
        <View style={styles.payment_container}>
        <View style={styles.checkbox_container}>
          <LOCATION_ICON />
          <View style={styles.address}>
            <Fonts type="boldBlack">John Doe</Fonts>
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
      ) :  <View style={styles.checkbox_container}>
      <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
        <Image source={ADD} />
      </TouchableOpacity>
      <Fonts type="boldBlack">Add address</Fonts>
    </View>} 
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
        <CustomLoader />
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
  return (
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
};

const OrderConfirmation: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showModal, setShowModal] = useState(false);
  const bounceValue = new Animated.Value(1);
  const [viewReceipt, setViewReceipt] = useState(false);
  const [saveDeliveryFee, setSaveDeliveryFee] = useState<number>(0);
  const [saveServiceFee, setSaveServiceFee] = useState<number>(0);
  const {cartData, cartList, userLga, userState} = useSelector(
    (state: RootState) => state.order,
  );
  const [showCheckoutMsg, setShowCheckoutMsg] = useState(false);
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

  const handleNavigateToHomeScreen = () => {
    setShowModal(false);
    navigation.navigate('BottomNavigator');
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

    const totalAmount = totalCartAmount + saveDeliveryFee + saveServiceFee;
    const formattedTotalAmount = `₦${totalAmount.toFixed(2)}`;

    return formattedTotalAmount;
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

  const getDeliveryFee = () => {
    if (!userLga) {
      console.error('userLga is not available');
      return;
    }
    const payload = {
      filter: {
        fields: [
          {
            name: 'fee_type',
            operator: 'isEqualTo',
            value: 'DELIVERY_FEE',
          },
          {
            name: 'lga',
            operator: 'isEqualTo',
            value: userLga!,
          },
        ],
        operator: 'and',
      },
      paging: {
        index: 0,
        size: 1,
      },
    };
    dispatch(deliveryFee(payload))
      .then(response => {
        const result = response.payload as any;
        if (response && result) {
          const feeItem = result.data as any;
          const generateDeliveryFee = feeItem.data!.find(
            (item: {fee_type: string}) => item.fee_type === 'DELIVERY_FEE',
          );
          if (generateDeliveryFee) {
            const deliveryFee = generateDeliveryFee.cost.cost_per_type;
            setSaveDeliveryFee(deliveryFee);
          } else {
            return null;
          }
        }
      })
      .catch(error => {
        console.error('Error getting delivery fees', error);
      });
  };

  const getServiceFee = () => {
    const payload = {
      filter: {
        fields: [
          {
            name: 'fee_type',
            operator: 'isEqualTo',
            value: 'SERVICE_FEE',
          },
        ],
        operator: 'and',
      },
      paging: {
        index: 0,
        size: 10,
      },
    };
    dispatch(serviceFee(payload))
      .then(response => {
        const result = response.payload as FeesResponse;
        if (response && result && result.data) {
          const feeItem = result.data as FeesResponse;
          const serviceFee = feeItem.data!.find(
            item => item.fee_type === 'SERVICE_FEE',
          );
          if (serviceFee) {
            const costPerType = serviceFee.cost.cost_per_type;
            setSaveServiceFee(costPerType);
            dispatch(setServiceFee(costPerType));
          } else {
            return null;
          }
        }
      })
      .catch(error => {
        console.error('Error getting fees:', error);
      });
  };

  const getCartid = () => {
    const cartId = cartData?.data?.id;
    console.log('DISPATCH CART ID', cartId);
    console.log('user lga', userLga);
    console.log('user state', userState);
    dispatch(setUserCartId(cartId));
    return cartId;
  };

  const handleCheckout = () => {
    if (!cartData?.data?.id && !userLga && !useState) {
      setShowCheckoutMsg(true);
      console.error('incomplete data');
      return;
    } else {
      const cartId = cartData?.data?.id;
      console.log('cart id', cartId);
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
          name: '',
          phone: '',
        },
        delivery_fee: saveDeliveryFee,
        payment_method: '',
        service_fee: saveServiceFee,
        total_fee: 2000,
      };
      dispatch(triggerCheckout(payload)).then(response => {
        try {
          const result = response.payload as any;
          if (response && result && result.data) {
            setViewReceipt(true);
            setShowModal(true);
            setShowCheckoutMsg(false);
          } else {
            return null;
          }
        } catch (error) {}
      });
    }
  };

  useEffect(() => {
    listCart();
    getServiceFee();
    if (userLga) {
      getDeliveryFee();
    }
    getCartid();
  }, [userLga]);

  return (
    <>
      <FormMainContainer>
        {showCheckoutMsg && (
          <CustomToast>
            <Fonts type="smallText">Checkout unseccessfull</Fonts>
          </CustomToast>
        )}
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.main_container}>
            <ScreenTitle
              screenTitle="ORDER CONFIRMATION"
              onPress={navigation!.goBack}
            />
            <View>
              <RenderPaymentMethod />
              <RenderDeliveryAddress navigation={navigation} deliveryAddress={saveDeliveryFee}/>
              <Fonts type="boldLightGray" style={{paddingTop: 15}}>
                Your Cart
              </Fonts>
              <RenderOrder
                cartList={cartList}
                sumAllOrders={sumAllOrders}
                serviceFeePerOrder={saveServiceFee!}
                deliveryFeePerOrder={saveDeliveryFee!}
              />
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
                  {saveDeliveryFee && saveServiceFee
                    ? getOrderSummary()
                    : sumAllOrders()}
                </Fonts>
              </View>
              <Buttons
                title="Checkout"
                disabled={!userLga || !saveServiceFee}
                textStyle={undefined}
                buttonStyle={undefined}
                onPress={handleCheckout}
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
