import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Animated, TouchableOpacity, View, Image, Easing} from 'react-native';
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
} from '../../Assets/svgImages';
import Fonts from '../../Constants/Fonts';
import {colors} from '../../Constants/Colors';
import Buttons from '../../Components/Buttons/Buttons';
import CustomModal from '../../Components/Modal/CustomModal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {
  CartItemResponsePayload,
  FeesResponse,
} from '../../redux/slices/order/types';
import {
  DeliveryFeeData,
  deliveryFee,
  serviceFee,
  triggerCartList,
  triggerCheckout,
} from '../../redux/slices/order/orderServices';
import CustomLoader from '../../Components/Loader/CustomLoader';
import {
  setServiceFee,
  setUserCartId,
  updateUserDeliveryFee,
} from '../../redux/slices/order/orderSlice';
import {ADD} from '../../Assets';
import CustomToast from '../../Components/Toast/CustomToast';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {triggerGetUserData} from '../../redux/slices/auth/userServices';
import {capitalizeFirstLetter} from '../../utils';
import {IProps, Order, Payment, UserDataType} from './propTypes';
import {useFocusEffect} from '@react-navigation/native';
import {UserDataResponse} from '../../redux/slices/auth/type';
import useUserType from '../../redux/manageUserType/userType';
import {user} from '../../redux/manageUserType/checkUserType';
import { getGuestData } from '../../redux/slices/auth/guestServices';

const RenderDeliveryAddress: FC<IProps> = ({
  navigation,
  fullName,
  address,
  state,
  phone,
}) => {
  const styles = useMemo(() => createStyles(), []);
  const userType = useUserType();
  const [isGuestAddress, setIsGuestAddrress] = useState(false);

  const fetcGuestAddress = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInformation');
      const retrievedUserInfoormation =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      if (retrievedUserInfoormation.address.state) {
        setIsGuestAddrress(true);
      } else {
        setIsGuestAddrress(false);
      }
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  };
  useEffect(() => {
      fetcGuestAddress();
  }, []);
  return (
    <View style={styles.card_style}>
      <Fonts type="boldLightGray">Delivery Address</Fonts>
      {userType === user.registered ||
      (userType === user.guest && isGuestAddress) ? (
        <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
        <View style={styles.payment_container}>
          <View style={styles.checkbox_container}>
            <LOCATION_ICON />
            <View style={styles.address}>
              <Fonts type="boldBlack">{fullName}</Fonts>
              <Fonts type="normalGrayText">{address}</Fonts>
              <Fonts type="normalGrayText">
                {capitalizeFirstLetter(state!)} Nigeria
              </Fonts>
              <Fonts type="normalGrayText">{phone}</Fonts>
            </View>
          </View>
            <RIGHT_ICON />
        </View>
         </TouchableOpacity>
      ) : (
        userType === user.guest &&
        !isGuestAddress && (
          <View style={styles.checkbox_container}>
            <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
              <Image source={ADD} />
            </TouchableOpacity>
            <Fonts type="boldBlack">Add address</Fonts>
          </View>
        )
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

const RenderPaymentMethod: FC<Payment> = ({pyamentMethod, onPress}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View>
      <Fonts type="boldLightGray">Payment Method</Fonts>
      <View style={styles.payment_container}>
        <View style={styles.checkbox_container}>
          <TouchableOpacity onPress={onPress}>
            <Fontisto
              name={pyamentMethod ? 'check' : 'checkbox-passive'}
              size={10}
              style={{
                color: pyamentMethod ? colors.ORANGE : colors.BLACK,
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
  const {cartList, userLga, userState, userDeliveryFee, loading} = useSelector(
    (state: RootState) => state.order,
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [orderServiceFee, setOrderServiceFee] = useState(0);
  const [orderDeliveryFee, setOrderDeliveryFee] = useState(0);
  const dispatch = useDispatch();
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(false);
  const [noPaymentMethod, setNoPaymentMethod] = useState(false);
  const [retrieveUserData, setRetrieveUserData] = useState<UserDataType>({
    fullName: '',
    address: '',
    state: '',
    phone: '',
    email: '',
    lga: '',
  });
  const userType = useUserType();

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.quad,
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
    const totalAmount = cartList?.data?.cart_items.reduce((total, item) => {
      return total + item.cost;
    }, 0);
    const formattedTotalAmount = `₦${totalAmount?.toFixed(2)}`;
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
  const getCartid = () => {
    const cartId = cartList?.data?.id;
    dispatch(setUserCartId(cartId));
    return cartId;
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
            setOrderServiceFee(costPerType);
            dispatch(setServiceFee(costPerType));
          } else {
            return null;
          }
        }
      })
      .catch(error => {
        console.error('Error getting service:', error);
      });
  };
  const getDeliveryFee = async () => {
    if (!retrieveUserData.lga) return;
    const payload: DeliveryFeeData = {
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
            value: retrieveUserData.lga!,
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
            setOrderDeliveryFee(deliveryFee);
            dispatch(updateUserDeliveryFee(deliveryFee));
          } else {
            return null;
          }
        }
      })
      .catch(error => {
        console.error('Error getting delivery fees', error);
      });
  };
  const getOrderSummary = useCallback(() => {
    const totalCartAmount =
      cartList?.data?.cart_items.reduce((total, item) => {
        return total + item.cost;
      }, 0) || 0;
    const deliveryFee = orderDeliveryFee;
    const serviceFee = orderServiceFee;
    const total = totalCartAmount + deliveryFee + serviceFee;
    setOrderSummary(total);
  }, [cartList, orderDeliveryFee, orderServiceFee]);
  const handleShowModal = () => {
    if (!selectPaymentMethod) {
      setNoPaymentMethod(true);
      setTimeout(() => {
        setNoPaymentMethod(false);
      }, 2000);
    } else {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        setShowModal(true);
      }, 2000);
    }
  };

  const handleCheckout = async () => {
    const cartId = cartList?.data?.id;
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
          full_address: retrieveUserData.address!,
          lga: userLga as string,
          state: userState as string,
          verified: true,
        },
        email: retrieveUserData.email!,
        name: retrieveUserData.fullName!,
        phone: retrieveUserData.phone!,
      },
      delivery_fee: orderDeliveryFee,
      payment_method: 'Pay on delivery',
      service_fee: orderServiceFee,
      total_fee: orderSummary,
    };
    try {
      const response = await dispatch(triggerCheckout(payload));
      const result = response.payload as any;
      if (result && result.data) {
        setViewReceipt(true);
      } else {
        setShowErrorMsg(true);
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error triggering checkout:', (error as any).data?.message);
      const errorMessage = (error as any).data?.message;
      setErrorMsg(errorMessage);
      setShowErrorMsg(true);
      setTimeout(() => {
        setShowErrorMsg(false);
      }, 5000);
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

  const selctedPaymentMethod = () => {
    setSelectPaymentMethod(!selectPaymentMethod);
  };

  const getUserData = () => {
    dispatch(triggerGetUserData())
      .then(response => {
        const result = response.payload as UserDataResponse;
        if (response && result && result.data) {
          const lastIndex = result.data.addresses.length - 1;
          const fullAddress = result.data.addresses[lastIndex]?.full_address;
          const state = result.data.addresses[lastIndex]?.state;
          const userEmail = result?.data.email.address;
          const fullName = `${result?.data.first_name} ${result?.data.last_name}`;
          const getUserLga = result.data.addresses[lastIndex]?.lga;
          setRetrieveUserData({
            fullName: fullName,
            address: fullAddress,
            state: state,
            phone: result?.data.phone.number,
            email: userEmail,
            lga: getUserLga,
          });
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error getting user data:', error);
      });
  };

  const fetchGuestAddress  = async () => {
    dispatch(getGuestData())
      .then(response => {
        const result = response.payload as GuestDataResponse
        if (response && result && result.data) {
         const fullAddress = result.data.address.full_address;
         const state = result.data.address.state;
         const userEmail = result.data.email;
         const fullName = `${result?.data.first_name} ${result?.data.last_name}`;
         const getUserLga = result?.data.address.lga;
         setRetrieveUserData({
          fullName: fullName,
          address: fullAddress,
          state: state,
          phone: result?.data.number,
          email: userEmail,
          lga: getUserLga,
        });
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error fetching guest data:', error);
      });
  };

  useEffect(() => {
    startRotation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userType && userType === user.registered) {
        getUserData();
      }
      if (userType === user.guest) {
        fetchGuestAddress();
      }
      getServiceFee();
    }, [userType]),
  );

  useEffect(() => {
    getDeliveryFee();
  }, [retrieveUserData.lga]);

  useEffect(() => {
    listCart();
    getCartid();
    if (orderDeliveryFee && orderServiceFee) {
      getOrderSummary();
    }
  }, [orderDeliveryFee, orderServiceFee]);

  return (
    <>
      <FormMainContainer>
        <ScreenTitle
          screenTitle="ORDER CONFIRMATION"
          onPress={navigation!.goBack}
        />
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.main_container}>
            <View>
              <RenderPaymentMethod
                onPress={selctedPaymentMethod}
                pyamentMethod={selectPaymentMethod}
              />
              <RenderDeliveryAddress
                navigation={navigation}
                deliveryCost={userDeliveryFee}
                fullName={retrieveUserData.fullName}
                address={retrieveUserData.address}
                state={retrieveUserData.state}
                phone={retrieveUserData.phone}
              />
              <Fonts type="boldLightGray" style={{paddingTop: 15}}>
                Your Cart
              </Fonts>
              <RenderOrder
                cartList={cartList}
                sumAllOrders={sumAllOrders}
                serviceFeePerOrder={orderServiceFee}
                deliveryFeePerOrder={orderDeliveryFee}
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
                  {orderDeliveryFee || orderServiceFee
                    ? orderSummary
                    : 'calculating...'}
                </Fonts>
              </View>
              <Buttons
                title="Checkout"
                disabled={!orderSummary}
                textStyle={undefined}
                buttonStyle={undefined}
                onPress={handleShowModal}
              />
            </View>
          </View>
        </ScrollView>
      </FormMainContainer>
      <CustomModal
        visible={noPaymentMethod}
        style={styles.error_modal_container}>
        <Fonts type="normalGrayText">Please select a payment method.</Fonts>
      </CustomModal>

      <CustomModal visible={showModal} style={styles.modal_container}>
        {viewReceipt && (
          <>
            <FormMainContainer>
              <View style={styles.success_msg_container}>
                <LottieView
                  source={require('../../Assets/success_animation.json')}
                  autoPlay
                  loop
                  style={{width: 150, height: 150}}
                />
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
                  onPress={() => navigation.navigate('BottomNavigator')}
                />
              </View>
            </FormMainContainer>
          </>
        )}
        {!viewReceipt && (
          <FormMainContainer>
             {loader && <CustomLoader />}
             {loading && <CustomLoader />}
            {showErrorMsg && <CustomToast>{errorMsg}</CustomToast>}
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
                title={userType === user.registered ? "Sign Out " : "Sign Out As Guest" }
                disabled={false}
                buttonStyle={undefined}
                textStyle={{fontSize: 17}}
                onPress={handleCheckout}
              />
              {/* {loader && <CustomLoader />}
              {loading && <CustomLoader />} */}
              {userType === user.guest &&  <Buttons
                title="Sign In To Continue"
                disabled={false}
                buttonStyle={styles.view_receipt_btn}
                textStyle={styles.view_receipt_text}
                onPress={signInToContinue}
              />}
             
            </View>
          </FormMainContainer>
        )}
      </CustomModal>
    </>
  );
};

export default OrderConfirmation;
