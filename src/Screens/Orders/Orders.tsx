import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import {NAVIGATOR, SHOPPING_BAG} from '../../Assets/svgImages';
import ShadowNavBar from '../../Components/NavBar/ShadowNavBar';
import createStyles from './styles';
import {ScrollView, Text, View, FlatList} from 'react-native';
import Tabs from '../../Components/Tabs/Tabs';
import {ComponentType} from './types';
import {RootState} from '../../redux/rootReducer';
import Buttons from '../../Components/Buttons/Buttons';
import {CYLINDER} from '../../Assets/svgImages';
import Fonts from '../../Constants/Fonts';
import {colors} from '../../Constants/Colors';
import Card from '../../Components/Card/Card';
import {useDispatch, useSelector} from 'react-redux';
import {triggerOrderList} from '../../redux/slices/order/orderServices';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomLoader from '../../Components/Loader/CustomLoader';
import {formattedDate} from '../../utils';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const Orders: FC<IProps> = ({navigation}) => {
  const {orderList} = useSelector((state: RootState) => state.order);
  const [orders, setOrders] = useState<Record<string, any>[]>([]);
  const styles = useMemo(() => createStyles(), []);
  const dispatch = useDispatch();
  const {loading, data, message, error} = orderList;

  const [showComponent, setShowComponent] = useState<ComponentType>({
    allOrders: true,
    openOrders: false,
    deliveredOrders: false,
    cancelledOrders: false,
  });

  const openOrders = orders.filter(
    order =>
      order.status_history[order.status_history.length - 1].status !==
        'COMPLETED' ||
      order.status_history[order.status_history.length - 1].status !==
        'CANCELLED' ||
      order.status_history[order.status_history.length - 1].status !==
        'REJECTED',
  );
  const deliveredOrders = orders.filter(
    order =>
      order.status_history[order.status_history.length - 1].status ===
      'COMPLETED',
  );

  const cancelledOrders = orders.filter(
    order =>
      order.status_history[order.status_history.length - 1].status ===
        'CANCELLED' ||
      order.status_history[order.status_history.length - 1].status ===
        'REJECTED',
  );

  const showCurrentComponent = (key: keyof ComponentType) => {
    let keys = Object.keys(showComponent) as Array<keyof ComponentType>;
    keys.forEach(item => {
      if (item === key) {
        setShowComponent(prev => ({...prev, [item]: true}));
      } else {
        setShowComponent(prev => ({...prev, [item]: false}));
      }
    });
  };

  const renderItem = ({item}: any) => {
    const totalMass = item.orders.reduce(
      (accum: any, gas: {weight: any}) => accum + gas.weight,
      0,
    );
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Summary')}>
        <Card>
          <View style={styles.order_container}>
            <CYLINDER />
            <View style={styles.order_desc_container}>
              <Fonts type="extraSmallBlackText">{totalMass}Kg Gas Refill</Fonts>
              <Fonts type="extraSmallBlackText">Order #12345678</Fonts>
              <View
                style={
                  item.status_history[item.status_history.length - 1].status ===
                  'COMPLETED'
                    ? styles.all_orders_status_container
                    : item.status_history[item.status_history.length - 1]
                        .status === 'CANCELLED' ||
                      item.status_history[item.status_history.length - 1]
                        .status === 'REJECTED'
                    ? styles.cancelled_orders_status_container
                    : styles.open_orders_status_container
                }>
                <Fonts type="normalBoldText" style={{color: colors.WHITE}}>
                  {item.status_history[item.status_history.length - 1].status}
                </Fonts>
              </View>
              <Fonts type="normalBoldBlackText">{formattedDate(item.ts)}</Fonts>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      const payload = {
        paging: {
          index: 0,
          size: 10,
        },
      };
      dispatch(triggerOrderList(payload));
    }, []),
  );

  useEffect(() => {
    if (!error && !loading) {
      const ordersData = data ? data : [];
      setOrders(ordersData);
    }
  }, [loading, error]);

  return (
    <>
      <ShadowNavBar
        text="All Orders"
        onPress={navigation.goBack}
        size={34}
        fill="#EAECF0"
        pathData="M14.5 21L11 17M11 17L14.5 13M11 17H24"
        imageSrc={NAVIGATOR}
      />

      <View style={styles.main_container}>
        {loading ? (
          <CustomLoader />
        ) : (
          <View style={styles.main_container}>
            {!error && orders.length === 0 ? (
              <View style={styles.scrollContainerEmpty}>
                <View style={styles.empty_cart_container}>
                  <SHOPPING_BAG />
                  <Fonts style={[styles.bold_txt, {color: colors.GRAY}]}>
                    Empty orders
                  </Fonts>
                  <Fonts style={styles.gray_txt}>
                    your orders will be displayed here
                  </Fonts>
                </View>
              </View>
            ) : (
              <>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scrollable_tabs_container}>
                  <View style={styles.order_description_container}>
                    <Tabs
                      onPress={() => showCurrentComponent('allOrders')}
                      text="All Orders"
                      viewStyle={
                        showComponent.allOrders
                          ? styles.activeContainer
                          : styles.inactiveContainer
                      }
                    />
                    <Tabs
                      onPress={() => showCurrentComponent('openOrders')}
                      text="Open Orders"
                      viewStyle={
                        showComponent.openOrders
                          ? styles.activeContainer
                          : styles.inactiveContainer
                      }
                    />
                    <Tabs
                      onPress={() => showCurrentComponent('deliveredOrders')}
                      text="Delivered Orders"
                      viewStyle={
                        showComponent.deliveredOrders
                          ? styles.activeContainer
                          : styles.inactiveContainer
                      }
                    />
                    <Tabs
                      onPress={() => showCurrentComponent('cancelledOrders')}
                      text="Cancelled Orders"
                      viewStyle={
                        showComponent.cancelledOrders
                          ? styles.activeContainer
                          : styles.inactiveContainer
                      }
                    />
                  </View>
                </ScrollView>

                <View>
                  {showComponent.allOrders && (
                    <View style={styles.scrollContainer}>
                      {orders.length > 0 ? (
                        <View>
                          <FlatList
                            data={orders}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                          />
                        </View>
                      ) : (
                        <View style={styles.scrollContainerEmpty}>
                          <View style={styles.empty_cart_container}>
                            <SHOPPING_BAG />
                            <Fonts
                              style={[styles.bold_txt, {color: colors.GRAY}]}>
                              Empty orders
                            </Fonts>
                            <Fonts style={styles.gray_txt}>
                              your orders will be displayed here when you made
                              at least one
                            </Fonts>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                  {showComponent.openOrders && (
                    <View style={styles.scrollContainer}>
                      {openOrders.length > 0 ? (
                        <View>
                          <FlatList
                            data={openOrders}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                          />
                        </View>
                      ) : (
                        <View style={styles.scrollContainerEmpty}>
                          <View style={styles.empty_cart_container}>
                            <SHOPPING_BAG />
                            <Fonts
                              style={[styles.bold_txt, {color: colors.GRAY}]}>
                              Empty orders
                            </Fonts>
                            <Fonts style={styles.gray_txt}>
                              No pending orders
                            </Fonts>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                  {showComponent.deliveredOrders && (
                    <View style={styles.scrollContainer}>
                      {deliveredOrders.length > 0 ? (
                        <View>
                          <FlatList
                            data={deliveredOrders}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                          />
                        </View>
                      ) : (
                        <View style={styles.scrollContainerEmpty}>
                          <View style={styles.empty_cart_container}>
                            <SHOPPING_BAG />
                            <Fonts
                              style={[styles.bold_txt, {color: colors.GRAY}]}>
                              Empty orders
                            </Fonts>
                            <Fonts style={styles.gray_txt}>
                              No completed orders
                            </Fonts>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                  {showComponent.cancelledOrders && (
                    <View style={styles.scrollContainer}>
                      {cancelledOrders.length > 0 ? (
                        <View>
                          <FlatList
                            data={cancelledOrders}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                          />
                        </View>
                      ) : (
                        <View style={styles.scrollContainerEmpty}>
                          <View style={styles.empty_cart_container}>
                            <SHOPPING_BAG />
                            <Fonts
                              style={[styles.bold_txt, {color: colors.GRAY}]}>
                              Empty orders
                            </Fonts>
                            <Fonts style={styles.gray_txt}>
                              No cancelled or rejected orders
                            </Fonts>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default Orders;
