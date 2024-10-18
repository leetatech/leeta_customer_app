import React, {useMemo, useState, FC, useCallback, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import createStyles from './styles';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {CYLINDER} from '../../Assets/svgImages';
import {colors} from '../../Constants/Colors';
import Buttons, {ButtonsOutline} from '../../Components/Buttons/Buttons';
import Fonts from '../../Constants/Fonts';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const Summary: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <>
      <SafeAreaView style={styles.safet_area} edges={['top', 'left', 'right']}>
        <View style={styles.nav_card}>
          <View style={styles.nav_card2}>
            <Fonts style={styles.gray_txt_sm}>Order No: #474849</Fonts>
            <Fonts style={styles.gray_txt_sm}>Date: Oct 20, 2023</Fonts>
            <Fonts style={styles.gray_txt_sm}>Time: 3:14pm</Fonts>
            <Fonts style={styles.gray_txt_sm}>Total: ₦ 8,325.00</Fonts>
          </View>
        </View>
        <ScrollView
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false} // Hide vertical scroll bar
          showsHorizontalScrollIndicator={false}
          contentInsetAdjustmentBehavior={'automatic'}
          contentContainerStyle={styles.scroll_safe}>
          <Fonts style={styles.screen_title}>Summary</Fonts>
          <Fonts style={styles.pill_tag}>WAITING TO BE SHIPPED</Fonts>
          <View style={styles.orders_container}>
            <CYLINDER />
            <View style={styles.description_container}>
              <Fonts style={styles.bold_txt}>Max Gas</Fonts>
              <Fonts style={styles.gray_txt}>type: Refill</Fonts>
              <Fonts style={styles.gray_txt}>weight: 10kg</Fonts>
              <View style={styles.amount_container}>
                <Fonts style={styles.gray_txt}>amount:</Fonts>
                <Fonts style={styles.bold_txt}>₦6800</Fonts>
              </View>
            </View>
          </View>
          <View style={styles.btns_content}>
            <Buttons
              title="Refill Again"
              disabled={false}
              buttonStyle={undefined}
              textStyle={styles.btns_size}
            />
            <ButtonsOutline
              title="View Status History"
              disabled={false}
              buttonStyle={styles.btn_style}
              textStyle={[styles.btns_size, {color: colors.ORANGE}]}
              //   onPress={() => navigation.navigate('BottomNavigator')}
            />
            <ButtonsOutline
              title="Download Receipt"
              disabled={false}
              buttonStyle={styles.btn_style}
              textStyle={[styles.btns_size, {color: colors.ORANGE}]}
              //   onPress={() => navigation.navigate('BottomNavigator')}
            />
          </View>
          <Fonts style={styles.payments}>PAYMENTS</Fonts>
          <Fonts style={styles.payments_mtd}>PAYMENT METHOD</Fonts>
          <View style={styles.payon}>
            <Fonts style={styles.text}>Payon delivery</Fonts>
          </View>
          <View style={styles.sect}>
            <View style={styles.list}>
              <Fonts style={styles.text}>Subtotal</Fonts>
              <Fonts style={styles.text}>₦6,800.00</Fonts>
            </View>
            <View style={styles.list}>
              <Fonts style={styles.text}>Delivery fee</Fonts>
              <Fonts style={styles.text}>₦1,500.00</Fonts>
            </View>
            <View style={styles.list}>
              <Fonts style={styles.text}>Service fee</Fonts>
              <Fonts style={styles.text}>₦25.00</Fonts>
            </View>
          </View>
          <Fonts style={styles.delivery}>DELIVERY</Fonts>
          <View style={styles.sect2}>
            <View style={styles.list}>
              <Fonts style={styles.text}>Delivery address</Fonts>
              <Fonts style={styles.text}>Alfred Rewane Street</Fonts>
            </View>
            <View style={styles.list}>
              <Fonts style={styles.text}>Delivered to</Fonts>
              <Fonts style={styles.text}>Becky Anderson</Fonts>
            </View>
            <View style={styles.list}>
              <Fonts style={styles.text}>Delivery type</Fonts>
              <Fonts style={styles.text}>Same day</Fonts>
            </View>
            <View style={styles.list}>
              <Fonts style={styles.text}>Vendor</Fonts>
              <Fonts style={styles.text}>Max Gas</Fonts>
            </View>
            <View style={styles.list}>
              <Fonts style={styles.text}>Quantity</Fonts>
              <Fonts style={styles.text}>10kg</Fonts>
            </View>
            <View style={styles.list}>
              <Fonts style={styles.text}>Item ordered</Fonts>
              <Fonts style={styles.text}>Refill</Fonts>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Summary;
