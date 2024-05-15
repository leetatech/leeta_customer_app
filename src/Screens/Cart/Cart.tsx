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
import { gasRefill } from '../../redux/slices/order/orderServices';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const Cart: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const {productId, productWeight} = useSelector((state: RootState) => state.order);
  const [showModal, setShowModal] = useState(false);
  const [showToastMsg, setshowToastMsg] = useState(false);
  const [itemQuantity, setitemQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([
    {
      title: 'Max Gas',
      type: 'Refill',
      weight: `${productWeight} Kg`,
      amount: '₦6800',
    },
   
  ]);
  const dispatch = useDispatch();

  const addToCart = async () => {
    try {
      const payload = {
        cost: 0,
        product_id: productId!,
        quantity: itemQuantity,
        weight: productWeight!,
      };
      await dispatch(gasRefill(payload));
      navigation.navigate('OrderConfirmation');
    } catch (error) {
      console.log("ERROR",error);
      console.error('An error occurred while adding to cart:', error);
    }
  };

  const removeCartItem = () => {
    setShowModal(false);
    setshowToastMsg(true);
    setTimeout(() => {
      setshowToastMsg(false);
      setCartItems([]);
    }, 2000);
  };


  const closeToast = () => {
    setshowToastMsg(false);
  };
  

  const handleItemIncrease = () => {
    setitemQuantity((prevQuantity: number) => prevQuantity + 1);
  };
  const handleItemDecrease = () => {
    if (itemQuantity > 1) {
      setitemQuantity((prevQuantity: number) => prevQuantity - 1);
    }
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

        {cartItems.length > 0 ? (
          <>
            <ScrollView
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}>
              {cartItems.map((item, index) => {
                return (
                  <View key={index} style={styles.orders_container}>
                    <View style={styles.container}>
                      <CYLINDER />
                      <View style={styles.description_container}>
                        <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
                          {item.title}
                        </Text>
                        <Text style={styles.gray_txt}>Type: {item.type}</Text>
                        <Text style={styles.gray_txt}>
                          Weight: {item.weight}
                        </Text>
                        <View style={styles.amount_container}>
                          <Text style={styles.gray_txt}>Amount:</Text>
                          <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
                            {item.amount}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.action}>
                      <TouchableOpacity onPress={()=> setShowModal(true)}>
                        <Text style={styles.bold_txt}>Remove</Text>
                      </TouchableOpacity>
                      <View style={styles.cart_item_cta_container}>
                        <TouchableOpacity onPress={handleItemDecrease}>
                          <DECREASE_ORDER_ICON />
                        </TouchableOpacity>
                        <Text style={[styles.gray_txt, {lineHeight: 15}]}>
                          {itemQuantity}
                        </Text>
                        <TouchableOpacity onPress={handleItemIncrease}>
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
                  ₦6800.00
                </Text>
              </View>
              <Buttons
                title="Continue"
                disabled={false}
                textStyle={undefined}
                buttonStyle={undefined}
                onPress={addToCart}
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
            <TouchableOpacity onPress={()=> setShowModal(false)}>
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
            onPress={()=>setShowModal(false)}
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
          onPress={closeToast}>
          <Text>product has been removed from cart</Text>
        </CustomToast>
      )}
    </>
  );
};

export default Cart;
