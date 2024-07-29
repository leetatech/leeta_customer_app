import React, {FC, useEffect, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import FormMainContainer from '../../Components/Layouts/PaddedLayout';
import {
  CANCEL_ICON,
  CYLINDER,
  DECREASE_ORDER_ICON,
  INCREASE_ORDER_ICON,
  SHOPPING_BAG,
} from '../../Assets/svgImages';
import createStyles from './styles';
import {colors} from '../../Constants/Colors';
import Buttons from '../../Components/Buttons/Buttons';
import {LEFT_ARROW} from '../../Assets';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Modal from 'react-native-modal';
import CustomToast from '../../Components/Toast/CustomToast';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {setServiceFee, updateCart} from '../../redux/slices/order/orderSlice';
import {
  serviceFee,
  triggerCartList,
  triggerDeleteCartItem,
  updateCartItemQuantity,
} from '../../redux/slices/order/orderServices';
import {CartItemResponsePayload, FeesResponse} from '../../redux/slices/order/types';
import CustomLoader from '../../Components/Loader/CustomLoader';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const Cart: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  let {fee,loading,cartList} = useSelector((state: RootState) => state.order);
  const [showModal, setShowModal] = useState(false);
  const [showToastMsg, setshowToastMsg] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const dispatch = useDispatch();

  const handleDeleteItem = async () => {
    try {
      await dispatch(triggerDeleteCartItem(selectedItem));
      setShowModal(false);
      displayToastMessage('Item deleted successfully.', 'success');
      dispatch(updateCart(selectedItem));
    } catch (error: any) {
      setShowModal(false);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        displayToastMessage(`Failed to delete item: ${errorMessage}`, 'error');
      } else if (error.message) {
        displayToastMessage(`Failed to delete item: ${error.message}`, 'error');
      } else {
        displayToastMessage('Failed to delete item, please try again', 'error');
      }
    }
  };
  const displayToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setshowToastMsg(true);
    setTimeout(() => {
      setshowToastMsg(false);
    }, 2000);
  };

  const handleItemIncrease = (index: number) => {
    if (!cartList || !cartList.data || !cartList.data.cart_items) {
      return;
    }
    const updatedCartItems = cartList.data.cart_items.map((item, indx) => {
      if (index === indx) {
        return {
          ...item,
          quantity: item.quantity + 1,
          cost: (item.quantity + 1) * fee! * item.weight,
        };
      }
      return item;
    });

    const updatedCartData = {
      ...cartList,
      data: {
        ...cartList.data,
        cart_items: updatedCartItems,
      },
    };

    dispatch(updateCart(updatedCartData));

    const updatedItem = updatedCartItems[index];
    const payload = {
      cart_item_id: updatedItem.id,
      quantity: updatedItem.quantity,
    };
    dispatch(updateCartItemQuantity(payload));
  };

  const handleItemDecrease = (index: number) => {
    const data = cartList?.data?.cart_items?.map((item, indx) => {
      if (index === indx && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
          cost: (item.quantity - 1) * fee! * item.weight,
        };
      }
      return item;
    });

    if (data) {
      const updatedItem = data[index];
      dispatch(
        updateCart({
          ...cartList,
          data: {
            ...cartList?.data,
            cart_items: data,
          },
        }),
      );
      const payload = {
        cart_item_id: updatedItem.id,
        quantity: updatedItem.quantity,
      };
      dispatch(updateCartItemQuantity(payload));
    }
  };

  const sumAllOrders = () => {
    const totalAmount = cartList?.data?.cart_items.reduce((total, item) => {
      return total + item.cost;
    }, 0);
    const formattedTotalAmount = `₦${totalAmount?.toFixed(2)}`;
    return formattedTotalAmount;
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

  useEffect(() => {
    getServiceFee();
    listCart()
  }, []);

  return (
    <>
      <FormMainContainer>
        <View style={styles.navigation_arrow_container}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={LEFT_ARROW} />
          </TouchableOpacity>
          <Text style={styles.description}>YOUR CART</Text>
        </View>
        {cartList?.data?.cart_items && cartList.data?.cart_items.length > 0 ? (
          <>
            {loading && <CustomLoader />}
            <ScrollView
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}>
              {cartList?.data?.cart_items?.map((item, index) => {
                return (
                  <View key={index} style={styles.orders_container}>
                    <View style={styles.container}>
                      <CYLINDER />
                      <View style={styles.description_container}>
                        <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
                          Max Gas
                        </Text>
                        <Text style={styles.gray_txt}>Type: Refill</Text>
                        <Text style={styles.gray_txt}>
                          Weight: {item.weight}
                        </Text>
                        <View style={styles.amount_container}>
                          <Text style={styles.gray_txt}>Amount:</Text>
                          <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
                            {item.cost}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.action}>
                      <TouchableOpacity
                        onPress={() => {
                          setShowModal(true);
                          setSelectedItem(item.id);
                        }}>
                        <Text style={styles.bold_txt}>Remove</Text>
                      </TouchableOpacity>
                      <View style={styles.cart_item_cta_container}>
                        <TouchableOpacity
                          onPress={() => handleItemDecrease(index)}>
                          <DECREASE_ORDER_ICON />
                        </TouchableOpacity>
                        <Text style={[styles.gray_txt, {lineHeight: 15}]}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleItemIncrease(index)}>
                          <INCREASE_ORDER_ICON />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.terms_container}>
              <Text style={styles.gray_txt}>
                If you proceed, you are automatically accepting and acknowledge{' '}
                <Text style={{color: colors.ORANGE}}>
                  all terms and polices of Leeta
                </Text>
              </Text>
              <View style={styles.action}>
                <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
                  Total
                </Text>
                <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
                  {sumAllOrders()}
                </Text>
              </View>
              <Buttons
                title="Continue"
                disabled={false}
                textStyle={undefined}
                buttonStyle={undefined}
                onPress={() => navigation.navigate('OrderConfirmation')}
              />
            </View>
          </>
        ) : (
          <View style={styles.empty_cart_container}>
            <SHOPPING_BAG />
            <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
              Empty cart
            </Text>
            <Text style={styles.gray_txt}>
              your orders will be displayed here
            </Text>
          </View>
        )}
      </FormMainContainer>

      <Modal isVisible={showModal} propagateSwipe={true} style={{margin: 0}}>
        <View style={styles.modal_container}>
          <View style={styles.action}>
            <Text style={styles.modal_title}>Remove from cart</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <CANCEL_ICON />
            </TouchableOpacity>
          </View>
          <Text style={styles.modal_description}>
            Do you really want to remove this item from your cart?
          </Text>
          <Buttons
            title="Continue Shopping"
            disabled={false}
            buttonStyle={{marginTop: 5}}
            textStyle={{fontSize: 17}}
            onPress={() => setShowModal(false)}
          />
          <Buttons
            title="Remove Item"
            disabled={false}
            buttonStyle={{
              backgroundColor: 'transparent',
              borderColor: colors.ORANGE,
              borderWidth: 1,
            }}
            textStyle={{color: colors.ORANGE, fontSize: 17}}
            onPress={() => handleDeleteItem()}
          />
        </View>
      </Modal>
      {showToastMsg && (
        <CustomToast
          viewStyle={{
            backgroundColor:
              toastType === 'success' ? colors.SUCCESS : colors.LYELLOW,
          }}
          textStyle={{
            fontWeight: '500',
            fontSize: 15,
            color: toastType === 'success' ? colors.BLACK : colors.GRAY,
          }}
          onPress={() => setshowToastMsg(false)}>
          <Text>{toastMessage}</Text>
        </CustomToast>
      )}
    </>
  );
};

export default Cart;
