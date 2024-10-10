import React, {useMemo, useState, FC, useCallback, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import createStyles from './styles';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {CYLINDER} from '../../Assets/svgImages';
import {colors} from '../../Constants/Colors';
import Buttons, {ButtonsOutline} from '../../Components/Buttons/Buttons';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const Summary: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <>
      {/* <SafeAreaView style={{backgroundColor: colors.WHITE}} edges={['top', 'left', 'right']}> */}
      <SafeAreaView
        style={{backgroundColor: colors.WHITE, flex: 1}}
        edges={['top', 'left', 'right']}>
        <View style={styles.nav_card}>
          <View style={styles.nav_card2}>
            <Text style={styles.gray_txt_sm}>Order No: #474849</Text>
            <Text style={styles.gray_txt_sm}>Date: Oct 20, 2023</Text>
            <Text style={styles.gray_txt_sm}>Time: 3:14pm</Text>
            <Text style={styles.gray_txt_sm}>Total: ₦ 8,325.00</Text>
          </View>
        </View>
        <ScrollView
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false} // Hide vertical scroll bar
          showsHorizontalScrollIndicator={false}
          contentInsetAdjustmentBehavior={'automatic'}
          contentContainerStyle={{paddingBottom: 20}}>
          <Text style={styles.screen_title}>Summary</Text>
          <Text style={styles.pill_tag}>WAITING TO BE SHIPPED</Text>
          <View style={styles.orders_container}>
            <CYLINDER />
            <View style={styles.description_container}>
              <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
                Max Gas
              </Text>
              <Text style={styles.gray_txt}>type: Refill</Text>
              <Text style={styles.gray_txt}>weight: 10kg</Text>
              <View style={styles.amount_container}>
                <Text style={styles.gray_txt}>amount:</Text>
                <Text style={[styles.bold_txt, {color: colors.GRAY}]}>
                  ₦6800
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'column', gap: 19}}>
            <Buttons
              title="Refill Again"
              disabled={false}
              buttonStyle={undefined}
              textStyle={{fontSize: 17}}
            />
            <ButtonsOutline
              title="View Status History"
              disabled={false}
              buttonStyle={{borderColor: colors.ORANGE, borderWidth: 1}}
              textStyle={{fontSize: 17, color: colors.ORANGE}}
              //   onPress={() => navigation.navigate('BottomNavigator')}
            />
            <ButtonsOutline
              title="Download Receipt"
              disabled={false}
              buttonStyle={{borderColor: colors.ORANGE, borderWidth: 1}}
              textStyle={{fontSize: 17, color: colors.ORANGE}}
              //   onPress={() => navigation.navigate('BottomNavigator')}
            />
          </View>
          <Text
            style={{
              color: colors.GRAY,
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 34,
              marginTop: 19,
            }}>
            PAYMENTS
          </Text>
          <Text
            style={{
              color: colors.GRAY,
              fontSize: 16,
              fontWeight: 'bold',
              lineHeight: 34,
            }}>
            PAYMENT METHOD
          </Text>
          <View style={{borderBottomWidth: 0.5, borderColor: colors.LGRAY}}>
            <Text style={styles.text}>Payon delivery</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.ORANGE,
              marginTop: 25,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Subtotal</Text>
              <Text style={styles.text}>₦6,800.00</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Delivery fee</Text>
              <Text style={styles.text}>₦1,500.00</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Service fee</Text>
              <Text style={styles.text}>₦25.00</Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 34,
              marginTop: 25,
            }}>
            DELIVERY
          </Text>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: colors.ORANGE,
              marginTop: 10,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Delivery address</Text>
              <Text style={styles.text}>Alfred Rewane Street</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Delivered to</Text>
              <Text style={styles.text}>Becky Anderson</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Delivery type</Text>
              <Text style={styles.text}>Same day</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Vendor</Text>
              <Text style={styles.text}>Max Gas</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Quantity</Text>
              <Text style={styles.text}>10kg</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Item ordered</Text>
              <Text style={styles.text}>Refill</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Summary;
