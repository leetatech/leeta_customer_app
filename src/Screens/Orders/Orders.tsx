import React, {FC, useMemo, useState} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {NAVIGATOR} from '../../Assets/svgImages';
import ShadowNavBar from '../../Components/NavBar/ShadowNavBar';
import createStyles from './styles';
import {ScrollView, Text, View} from 'react-native';
import Tabs from '../../Components/Tabs/Tabs';
import {ComponentType} from './types';
interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const Orders: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showComponent, setShowComponent] = useState<ComponentType>({
    openOrders: true,
    deliveredOrders: false,
    cancelledOrders: false,
  });

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
        <View style={styles.container}>
          <ScrollView
            scrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.order_description_container}>
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
          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={styles.order_container}>
            {showComponent.openOrders && (
              <View>
                <Text>New Order</Text>
              </View>
            )}
            {showComponent.deliveredOrders && (
              <View>
                <Text>Pending Order</Text>
              </View>
            )}
            {showComponent.cancelledOrders && (
              <View>
                <Text>Canceled Order</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Orders;
