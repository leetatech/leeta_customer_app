import React, {FC, useMemo, useState} from 'react';
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
import {updateCart} from '../../redux/slices/order/orderSlice';
import {updateCartItemQuantity} from '../../redux/slices/order/orderServices';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const Cart: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const {userCart,fee,cartData} = useSelector(
    (state: RootState) => state.order,
  );
  const [showModal, setShowModal] = useState(false);
  const [showToastMsg, setshowToastMsg] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const dispatch = useDispatch();

  const removeCartItem = () => {
    setShowModal(false);
    setshowToastMsg(true);
    const data = [...userCart!];
    data.splice(selectedItem, 1);
    dispatch(updateCart(data));
    setTimeout(() => {
      setshowToastMsg(false);
    }, 2000);
  };

  const handleItemIncrease = (index: number) => {
    const data = cartData?.data?.cart_items?.map((item, indx) => {
      if (index === indx) {
        return {
          ...item,
          quantity: item.quantity + 1,
          cost: (item.quantity + 1) * fee! * item.weight,
        };
      }
      return item;
    });

    if (data) {
      const updatedItem = data[index];
      dispatch(
        updateCart({
          ...cartData,
          data: {
            ...cartData?.data,
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

  const handleItemDecrease = (index: number) => {
    const data = cartData?.data?.cart_items?.map((item, indx) => {
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
          ...cartData,
          data: {
            ...cartData?.data,
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
    const totalAmount = cartData?.data?.cart_items.reduce((total, item) => {
      return total + item.cost;
    }, 0);
    const formattedTotalAmount = `₦${totalAmount?.toFixed(2)}`;
    return formattedTotalAmount;
  };

  return (
    <>
      <FormMainContainer>
        <View style={styles.navigation_arrow_container}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={LEFT_ARROW} />
          </TouchableOpacity>
          <Text style={styles.description}>YOUR CART</Text>
        </View>

        {cartData?.data?.cart_items && cartData.data?.cart_items.length > 0 ? (
          <>
            <ScrollView
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}>
              {cartData.data.cart_items?.map((item, index) => {
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
                          setSelectedItem(index);
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
            onPress={removeCartItem}
          />
        </View>
      </Modal>
      {showToastMsg && (
        <CustomToast
          viewStyle={{backgroundColor: colors.SUCCESS}}
          textStyle={{fontWeight: '500', fontSize: 15}}
          onPress={() => setshowToastMsg(false)}>
          <Text>product has been removed from cart</Text>
        </CustomToast>
      )}
    </>
  );
};

export default Cart;
