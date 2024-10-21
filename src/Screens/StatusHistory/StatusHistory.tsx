import React, {useMemo, FC} from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {
  RouteProp,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import Fonts from '../../Constants/Fonts';
import {LEFT_ARROW} from '../../Assets';
import createStyles from './styles';
import {TICK, TICK1, NOTICK, LINE} from '../../Assets/svgImages';
import {SafeAreaView} from 'react-native-safe-area-context';

// Define the type for route params
interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const StatusHistory: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <SafeAreaView style={styles.safet_area} edges={['top', 'left', 'right']}>
      <View style={styles.mainContainer}>
        <View style={styles.navigation_arrow_container}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image source={LEFT_ARROW} />
          </TouchableOpacity>
          <Fonts style={styles.description}>ITEM STATUS</Fonts>
        </View>
        <View style={styles.historyContainer}>
          <View style={styles.statusContainer}>
            <View style={styles.historyBar}>
              <TICK
                width={styles.svgStyle.width}
                height={styles.svgStyle.width}
              />
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
                <Fonts style={styles.pill_tag}>ORDER PLACED</Fonts>
              </View>
              <Fonts type="normalBoldText">Tuesday, 10 - 2 </Fonts>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.historyBar}>
              <TICK
                width={styles.svgStyle.width}
                height={styles.svgStyle.width}
              />
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
                <Fonts style={styles.pill_tag}>PENDING CONFIRMATION</Fonts>
              </View>
              <Fonts type="normalBoldText">Tuesday, 10 - 2 </Fonts>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.historyBar}>
              <TICK
                width={styles.svgStyle.width}
                height={styles.svgStyle.width}
              />
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
                <Fonts style={styles.pill_tag}>WAITING TO BE SHIPPED</Fonts>
              </View>
              <Fonts type="normalBoldText">Tuesday, 10 - 2 </Fonts>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.historyBar}>
              <TICK
                width={styles.svgStyle.width}
                height={styles.svgStyle.width}
              />
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
                <Fonts style={styles.pill_tag}>OUT FOR DELIVERY</Fonts>
              </View>
              <Fonts type="normalBoldText">Tuesday, 10 - 2 </Fonts>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.historyBar}>
              <TICK
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
                style={styles.open_orders_status_container}>
                <Fonts style={styles.pill_tag}>DELIVERED</Fonts>
              </View>
              <Fonts type="normalBoldText">Tuesday, 10 - 2 </Fonts>
              <Fonts type="normalBoldText">
                your item/ Order has been delivered.
              </Fonts>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StatusHistory;
