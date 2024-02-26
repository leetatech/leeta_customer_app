import React, {FC, useMemo} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import FormMainContainer from '../../Components/Layouts/PaddedLayout';
import {CYLINDER, SHOPPING_BAG} from '../../Assets/svgImages';
import createStyles from './styles';
import {colors} from '../../Constants/Colors';
import Buttons from '../../Components/Buttons/Buttons';
import {LEFT_ARROW} from '../../Assets';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const cartItems: any[] = [
  {
    title: 'Max Gas',
    type: 'Refill',
    weight: '10Kg',
    amount: '₦6800',
  },
];

const Cart :FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <>
      <FormMainContainer>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{paddingTop: 15}} onPress={navigation.goBack}>
              <Image source={LEFT_ARROW} />
            </TouchableOpacity>
            <Text style={styles.description}>YOUR CART</Text>
          </View>

          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item, index) => {
                return (
                  <View key={index} style={styles.orders_container}>
                    <ScrollView> 
                      <View style={styles.container}>
                        <CYLINDER />
                        <View style={styles.description_container}>
                          <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
                            {item.title}
                          </Text>
                          <Text style={styles.gray_txt}>{item.type}</Text>
                          <Text style={styles.gray_txt}>{item.weight}</Text>
                          <Text style={styles.gray_txt}>{item.amount}</Text>
                        </View>
                      </View>
                      <View style={styles.action}>
                        <TouchableOpacity>
                          <Text style={styles.bold_txt}>Remove</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Text style={styles.bold_txt}>Add</Text>
                        </TouchableOpacity>
                      </View>
                      </ScrollView>
                     
                  </View>
                );
              })}
              <View style={{paddingVertical: 10, gap: 10}}>
                <Text style={styles.gray_txt}>
                  If you proceed, you are automatically accepting and
                  acknowledge{' '}
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
                  buttonStyle={{paddingBottom: 5}}
                  textStyle={undefined}
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
    </>
  );
};

export default Cart;
