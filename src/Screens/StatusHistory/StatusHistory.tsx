import React, {useMemo, FC, useCallback} from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {
  RouteProp,
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import Fonts from '../../Constants/Fonts';
import {LEFT_ARROW} from '../../Assets';
import {TICK, TICK1, NOTICK, LINE} from '../../Assets/svgImages';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {triggerOrderStatusHistory} from '../../redux/slices/order/orderServices';
import CustomLoader from '../../Components/Loader/CustomLoader';
import {formattedDate, getStatusValue} from '../../utils';
import createStyles from './styles';

// Define the type for route params
interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const StatusHistory: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const {selectedOrderId, orderStatusHistory} = useSelector(
    (state: RootState) => state.order,
  );

  const dispatch = useDispatch();
  const {id} = selectedOrderId;

  const {loading, data, message, error} = orderStatusHistory;

  useFocusEffect(
    useCallback(() => {
      dispatch(triggerOrderStatusHistory(id as number));
    }, []),
  );

  return (
    <SafeAreaView style={styles.safet_area} edges={['top', 'left', 'right']}>
      <View style={styles.mainContainer}>
        <View style={styles.navigation_arrow_container}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={LEFT_ARROW} />
          </TouchableOpacity>
          <Fonts style={styles.description}>ITEM STATUS</Fonts>
        </View>
        {loading ? (
          <View style={styles.mainContainer}>
            <CustomLoader />
          </View>
        ) : (
          <View style={styles.historyContainer}>
            <View
              style={
                data.length > 1
                  ? styles.statusContainerOpacity
                  : styles.statusContainer
              }>
              <View style={styles.historyBar}>
                {data[0] ? (
                  <TICK
                    width={styles.svgStyle.width}
                    height={styles.svgStyle.width}
                  />
                ) : (
                  <TICK1
                    width={styles.svgStyle.width}
                    height={styles.svgStyle.width}
                  />
                )}
                <LINE />
              </View>
              <View style={styles.displayInfo}>
                <View
                  // style={
                  //   data.status_history?.[data.status_history?.length - 1]
                  //     .status === 'COMPLETED'
                  //     ? styles.all_orders_status_container
                  //     : data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'CANCELLED' ||
                  //       data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'REJECTED'
                  //     ? styles.cancelled_orders_status_container
                  //     : styles.open_orders_status_container
                  // }
                  style={styles.open_orders_status_container}>
                  <Fonts style={styles.pill_tag}>
                    {getStatusValue(data[0]?.status)}
                  </Fonts>
                </View>
                <Fonts type="normalBoldText">
                  {formattedDate(data[0]?.status_ts)}
                </Fonts>
              </View>
            </View>
            <View
              style={
                data.length > 2
                  ? styles.statusContainerOpacity
                  : styles.statusContainer
              }>
              <View style={styles.historyBar}>
                {data[1] ? (
                  <TICK
                    width={styles.svgStyle.width}
                    height={styles.svgStyle.width}
                  />
                ) : (
                  <TICK1
                    width={styles.svgStyle.width}
                    height={styles.svgStyle.width}
                  />
                )}
                <LINE />
              </View>
              <View style={styles.displayInfo}>
                <View
                  // style={
                  //   data.status_history?.[data.status_history?.length - 1]
                  //     .status === 'COMPLETED'
                  //     ? styles.all_orders_status_container
                  //     : data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'CANCELLED' ||
                  //       data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'REJECTED'
                  //     ? styles.cancelled_orders_status_container
                  //     : styles.open_orders_status_container
                  // }
                  style={
                    !data[1]
                      ? styles.orders_status_container
                      : styles.open_orders_status_container
                  }>
                  <Fonts style={styles.pill_tag}>
                    {!data[1]
                      ? 'PENDING CONFIRMATION'
                      : getStatusValue(data[1].status)}
                  </Fonts>
                </View>
                {data[1] && (
                  <Fonts type="normalBoldText">
                    {formattedDate(data[1].status_ts)}
                  </Fonts>
                )}
              </View>
            </View>

            <View
              style={
                data.length > 3
                  ? styles.statusContainerOpacity
                  : styles.statusContainer
              }>
              <View style={styles.historyBar}>
                {data[2] ? (
                  <TICK
                    width={styles.svgStyle.width}
                    height={styles.svgStyle.width}
                  />
                ) : (
                  <TICK1
                    width={styles.svgStyle.width}
                    height={styles.svgStyle.width}
                  />
                )}
                <LINE />
              </View>
              <View style={styles.displayInfo}>
                <View
                  // style={
                  //   data.status_history?.[data.status_history?.length - 1]
                  //     .status === 'COMPLETED'
                  //     ? styles.all_orders_status_container
                  //     : data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'CANCELLED' ||
                  //       data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'REJECTED'
                  //     ? styles.cancelled_orders_status_container
                  //     : styles.open_orders_status_container
                  // }
                  style={
                    !data[2]
                      ? styles.orders_status_container
                      : styles.open_orders_status_container
                  }>
                  <Fonts style={styles.pill_tag}>
                    {!data[2]
                      ? 'WAITING TO BE SHIPPED'
                      : getStatusValue(data[2].status)}
                  </Fonts>
                </View>
                {data[2] && (
                  <Fonts type="normalBoldText">
                    {formattedDate(data[2].status_ts)}
                  </Fonts>
                )}
              </View>
            </View>

            <View
              style={
                data.length > 4
                  ? styles.statusContainerOpacity
                  : styles.statusContainer
              }>
              <View style={styles.historyBar}>
                {data[3] ? (
                  <TICK
                    width={styles.svgStyle.width}
                    height={styles.svgStyle.width}
                  />
                ) : (
                  <TICK1
                    width={styles.svgStyle.width}
                    height={styles.svgStyle.width}
                  />
                )}
                <LINE />
              </View>
              <View style={styles.displayInfo}>
                <View
                  // style={
                  //   data.status_history?.[data.status_history?.length - 1]
                  //     .status === 'COMPLETED'
                  //     ? styles.all_orders_status_container
                  //     : data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'CANCELLED' ||
                  //       data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'REJECTED'
                  //     ? styles.cancelled_orders_status_container
                  //     : styles.open_orders_status_container
                  // }
                  style={
                    !data[3]
                      ? styles.orders_status_container
                      : styles.open_orders_status_container
                  }>
                  <Fonts style={styles.pill_tag}>
                    {!data[3]
                      ? 'OUT FOR DELIVERY'
                      : getStatusValue(data[3].status)}
                  </Fonts>
                </View>
                {data[3] && (
                  <Fonts type="normalBoldText">
                    {formattedDate(data[3].status_ts)}
                  </Fonts>
                )}
              </View>
            </View>

            <View
              style={
                data.length > 4
                  ? styles.statusContainerOpacity
                  : styles.statusContainer
              }>
              <View style={styles.historyBar}>
                <NOTICK
                  width={styles.svgStyle.width}
                  height={styles.svgStyle.width}
                />
              </View>
              <View style={styles.displayInfo}>
                <View
                  // style={
                  //   data.status_history?.[data.status_history?.length - 1]
                  //     .status === 'COMPLETED'
                  //     ? styles.all_orders_status_container
                  //     : data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'CANCELLED' ||
                  //       data.status_history?.[data.status_history?.length - 1]
                  //         .status === 'REJECTED'
                  //     ? styles.cancelled_orders_status_container
                  //     : styles.open_orders_status_container
                  // }
                  style={
                    !data[4]
                      ? styles.orders_status_container
                      : styles.all_orders_status_container
                  }>
                  <Fonts style={styles.pill_tag}>
                    {!data[4] ? 'DELIVERED' : getStatusValue(data[4].status)}
                  </Fonts>
                </View>
                {data[4] && (
                  <>
                    <Fonts type="normalBoldText">
                      {formattedDate(data[4].status_ts)}
                    </Fonts>
                    <Fonts type="normalBoldText">
                      your item / order has been delivered.
                    </Fonts>
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StatusHistory;
