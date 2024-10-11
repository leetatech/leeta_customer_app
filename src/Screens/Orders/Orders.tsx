import React, {FC, useMemo, useState} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {NAVIGATOR} from '../../Assets/svgImages';
import ShadowNavBar from '../../Components/NavBar/ShadowNavBar';
import createStyles from './styles';
import {ScrollView, Text, View} from 'react-native';
import Tabs from '../../Components/Tabs/Tabs';
import {ComponentType} from './types';
import {CYLINDER} from '../../Assets/svgImages';
import Fonts from '../../Constants/Fonts';
import {colors} from '../../Constants/Colors';
import Card from '../../Components/Card/Card';
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
        <View>
          <ScrollView
            scrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.order_description_container}>
              <Tabs
                onPress={() => showCurrentComponent('openOrders')}
                text="All Orders"
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

          <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
            {showComponent.openOrders && (
              <View style={styles.scrollContainer}>
                <Card>
                  <View style={styles.order_container}>
                    <CYLINDER />
                    <View style={styles.order_desc_container}>
                      <Fonts type="smallText">10Kg Gas Refill</Fonts>
                      <Fonts type="smallText">Order #12345678</Fonts>
                      <View style={styles.all_orders_status_container}>
                        <Fonts
                          type="normalBoldText"
                          style={{color: colors.WHITE}}>
                          DELIVERED
                        </Fonts>
                      </View>
                      <Fonts type="normalBoldText">On Friday, 10 - 02</Fonts>
                    </View>
                  </View>
                </Card>
                
              </View>
            )}
          </ScrollView>
          {showComponent.deliveredOrders && (
            <View>
              <Text>Pending Order</Text>
            </View>
          )}
          {showComponent.cancelledOrders && (
            <View style={styles.scrollContainer}>
            <Card>
              <View style={styles.order_container}>
                <CYLINDER />
                <View style={styles.order_desc_container}>
                  <Fonts type="smallText">10Kg Gas Refill</Fonts>
                  <Fonts type="smallText">Order #12345678</Fonts>
                  <View style={styles.cancelled_orders_status_container}>
                    <Fonts
                      type="normalBoldText"
                      style={{color: colors.WHITE}}>
                      CANCELLED
                    </Fonts>
                  </View>
                  <Fonts type="normalBoldText">On Friday, 10 - 02</Fonts>
                </View>
              </View>
            </Card>
          </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Orders;
