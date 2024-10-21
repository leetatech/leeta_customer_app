import React, {useMemo, useState, FC, useCallback, useEffect} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  RouteProp,
  useFocusEffect,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';

import {RootState} from '../../redux/rootReducer';
import {ScrollView} from 'react-native-gesture-handler';
import {CANCEL_ICON, CYLINDER} from '../../Assets/svgImages';
import {colors} from '../../Constants/Colors';
import Buttons, {ButtonsOutline} from '../../Components/Buttons/Buttons';
import Fonts from '../../Constants/Fonts';
import {triggerOrderDetails} from '../../redux/slices/order/orderServices';
import CustomLoader from '../../Components/Loader/CustomLoader';
import {
  capitalizeFirstLetter,
  formatTimestamp,
  getStatusValue,
} from '../../utils';
import createStyles from './styles';

interface IProps {
  // route: RouteProp<{params: {id: number}}, 'params'>;
  navigation: NavigationProp<ParamListBase>;
}

interface ICarousel {
  data: Record<string, string | number>[];
}

const CustomCaro: FC<ICarousel> = ({data}) => {
  const width = Dimensions.get('window').width;
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[...data]}
        scrollAnimationDuration={3000}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View style={styles.orders_container}>
            <CYLINDER />
            <View style={styles.description_container}>
              <Fonts style={styles.bold_txt}>Max Gas</Fonts>
              <Fonts style={styles.gray_txt}>
                category: {data?.[index]?.product_category}
              </Fonts>
              <Fonts style={styles.gray_txt}>
                weight: {data?.[index]?.weight}kg
              </Fonts>
              <Fonts style={styles.gray_txt}>
                quantity: {data?.[index]?.quantity}
              </Fonts>
              <View style={styles.amount_container}>
                <Fonts style={styles.gray_txt}>amount:</Fonts>
                <Fonts style={styles.bold_txt}>
                  ₦{Number(data?.[index]?.cost).toLocaleString()}
                </Fonts>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const Summary: FC<IProps> = ({navigation}) => {
  const {orderDetails, selectedOrderId} = useSelector(
    (state: RootState) => state.order,
  );
  const styles = useMemo(() => createStyles(), []);
  const dispatch = useDispatch();
  const {loading, data, message, error} = orderDetails;
  // const {id} = route.params;
  const {id} = selectedOrderId;
  console.log(selectedOrderId);
  const totalMass = data?.orders?.reduce(
    (accum: any, gas: {weight: any}) => accum + gas.weight,
    0,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(triggerOrderDetails(id as number));
    }, []),
  );

  return (
    <>
      <SafeAreaView style={styles.safet_area} edges={['top', 'left', 'right']}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.nav_card}>
            <View style={styles.nav_card2}>
              <Fonts style={styles.gray_txt_sm}>Order No: #474849</Fonts>
              <Fonts style={styles.gray_txt_sm}>
                Date: {formatTimestamp(data.ts).date}
              </Fonts>
              <Fonts style={styles.gray_txt_sm}>
                Time: {formatTimestamp(data.ts).time}
              </Fonts>
              <Fonts style={styles.gray_txt_sm}>
                Total: ₦ {Number(data.total).toLocaleString()}
              </Fonts>
            </View>
            <TouchableOpacity onPress={navigation.goBack}>
              <CANCEL_ICON />
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <View style={styles.mainContainer}>
            <CustomLoader />
          </View>
        ) : (
          <ScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false} // Hide vertical scroll bar
            showsHorizontalScrollIndicator={false}
            contentInsetAdjustmentBehavior={'automatic'}
            contentContainerStyle={styles.scroll_safe}>
            <Fonts style={styles.screen_title}>Summary</Fonts>
            <View
              style={
                data.status_history?.[data.status_history?.length - 1]
                  .status === 'COMPLETED'
                  ? styles.all_orders_status_container
                  : data.status_history?.[data.status_history?.length - 1]
                      .status === 'CANCELLED' ||
                    data.status_history?.[data.status_history?.length - 1]
                      .status === 'REJECTED'
                  ? styles.cancelled_orders_status_container
                  : styles.open_orders_status_container
              }>
              <Fonts style={styles.pill_tag}>
                {getStatusValue(
                  data?.status_history?.[data.status_history?.length - 1]
                    ?.status,
                )}
              </Fonts>
            </View>

            {data.orders?.length > 1 ? (
              <CustomCaro
                data={data?.orders as Record<string, string | number>[]}
              />
            ) : (
              <View style={styles.orders_container}>
                <CYLINDER />
                <View style={styles.description_container}>
                  <Fonts style={styles.bold_txt}>Max Gas</Fonts>
                  <Fonts style={styles.gray_txt}>
                    category: {data?.orders?.[0]?.product_category}
                  </Fonts>
                  <Fonts style={styles.gray_txt}>
                    weight: {data?.orders?.[0]?.weight}kg
                  </Fonts>
                  <Fonts style={styles.gray_txt}>
                    quantity: {data?.orders?.[0]?.quantity}
                  </Fonts>
                  <View style={styles.amount_container}>
                    <Fonts style={styles.gray_txt}>amount:</Fonts>
                    <Fonts style={styles.bold_txt}>
                      ₦{Number(data?.orders?.[0]?.cost).toLocaleString()}
                    </Fonts>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.btns_content}>
              {data.status_history?.[data.status_history?.length - 1].status ===
              'COMPLETED' ? (
                <>
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
                </>
              ) : data.status_history?.[data.status_history?.length - 1]
                  .status === 'CANCELLED' ||
                data.status_history?.[data.status_history?.length - 1]
                  .status === 'REJECTED' ? (
                <></>
              ) : (
                <>
                  <ButtonsOutline
                    title="Cancel Refill"
                    disabled={false}
                    buttonStyle={styles.btn_style}
                    textStyle={[styles.btns_size, {color: colors.ORANGE}]}
                    //   onPress={() => navigation.navigate('BottomNavigator')}
                  />
                  <Buttons
                    title="Track My Refill"
                    disabled={false}
                    buttonStyle={undefined}
                    textStyle={styles.btns_size}
                    onPress={() => navigation.navigate('StatusHistory')}
                  />
                </>
              )}
            </View>
            <Fonts style={styles.payments}>PAYMENTS</Fonts>
            <Fonts style={styles.payments_mtd}>PAYMENT METHOD</Fonts>
            <View style={styles.payon}>
              <Fonts style={styles.text}>
                {capitalizeFirstLetter(data.payment_method)}
              </Fonts>
            </View>
            <View style={styles.sect}>
              <View style={styles.list}>
                <Fonts style={styles.text}>Subtotal</Fonts>
                <Fonts style={styles.text}>
                  ₦{Number(data.total).toLocaleString()}
                </Fonts>
              </View>
              <View style={styles.list}>
                <Fonts style={styles.text}>Delivery fee</Fonts>
                <Fonts style={styles.text}>
                  ₦{Number(data.delivery_fee).toLocaleString()}
                </Fonts>
              </View>
              <View style={styles.list}>
                <Fonts style={styles.text}>Service fee</Fonts>
                <Fonts style={styles.text}>
                  ₦{Number(data.service_fee).toLocaleString()}
                </Fonts>
              </View>
            </View>
            <Fonts style={styles.delivery}>DELIVERY</Fonts>
            <View style={styles.sect2}>
              <View style={styles.list}>
                <Fonts style={styles.text}>Delivery address</Fonts>
                <Fonts style={styles.text}>
                  {data.delivery_details?.address?.full_address}
                </Fonts>
              </View>
              <View style={styles.list}>
                <Fonts style={styles.text}>Delivered to</Fonts>
                <Fonts style={styles.text}>{data.delivery_details?.name}</Fonts>
              </View>
              <View style={styles.list}>
                <Fonts style={styles.text}>Email</Fonts>
                <Fonts style={styles.text}>
                  {data.delivery_details?.email}
                </Fonts>
              </View>
              <View style={styles.list}>
                <Fonts style={styles.text}>Vendor</Fonts>
                <Fonts style={styles.text}>Max Gas</Fonts>
              </View>
              <View style={styles.list}>
                <Fonts style={styles.text}>Quantity</Fonts>
                <Fonts style={styles.text}>{totalMass}kg</Fonts>
              </View>
              <View style={styles.list}>
                <Fonts style={styles.text}>Item ordered</Fonts>
                <Fonts style={styles.text}>Refill</Fonts>
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};

export default Summary;
