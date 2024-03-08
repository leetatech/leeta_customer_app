import React, {FC, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import createStyles from './styles';
import ScreenTitle from '../../Components/ScreenTitle/ScreenTitle';
import FormMainContainer from '../../Components/FormMainContainer/FormMainContainer';
import {
  CANCEL_ICON,
  CARD_ICON,
  CHECKBOX_ICON,
  CYLINDER,
  LOCATION_ICON,
  RIGHT_ICON,
  SUCCESS,
} from '../../Assets/svgImages';
import Fonts from '../../Constants/Fonts';
import {colors} from '../../Constants/Colors';
import Buttons from '../../Components/Buttons/Buttons';
import CustomModal from '../../Components/Modal/CustomModal';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

interface OrderItem {
  title: string;
  type: string;
  weight: string;
  amount: string;
}

const orderInformation = [
  {
    title: 'Max Gas',
    type: 'Refill',
    weight: '10Kg',
    amount: '₦6800',
  },
];

const OrderConfirmation: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  const [showModal, setShowModal] = useState(false);

  const handleModalVisibility = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNavigateToHomeScreen = () => {
    setShowModal(false)
    navigation.navigate('BottomNavigator')
  }

  const renderPaymentMethod = () => (
    <View>
      <Fonts type="boldLightGray">Payment Method</Fonts>
      <View style={styles.payment_container}>
        <View style={styles.checkbox_container}>
          <TouchableOpacity>
            <CHECKBOX_ICON />
          </TouchableOpacity>
          <Fonts type="semiBoldBlack">Pay On Delivery</Fonts>
        </View>
        <TouchableOpacity>
          <CARD_ICON />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDeliveryAddress = () => (
    <View style={styles.card_style}>
      <Fonts type="boldLightGray">Delivery Address</Fonts>
      <View style={styles.payment_container}>
        <View style={styles.checkbox_container}>
          <LOCATION_ICON />
          <View style={styles.address}>
            <Fonts type="boldBlack">Becky Anderson</Fonts>
            <Fonts type="normalGrayText">
              plot 234, adeola odeku Lagos, Nigeria
            </Fonts>
            <Fonts type="normalGrayText">+23456789021</Fonts>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
          <RIGHT_ICON />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrder = (order: OrderItem, index: number) => (
    <View
      style={[index === orderInformation.length - 1 && styles.card_style]}
      key={index}>
      <View style={styles.payment_container} key={index}>
        <View style={styles.checkbox_container}>
          <CYLINDER />
          <View style={styles.address}>
            <Fonts type="boldBlack">{order.title}</Fonts>
            <Fonts type="normalGrayText">Type: {order.type}</Fonts>
            <Fonts type="normalGrayText">Weight: {order.weight}</Fonts>
            <View style={styles.amount_container}>
              <Fonts type="normalGrayText">Amount:</Fonts>
              <Fonts
                type="normalGrayText"
                style={{fontWeight: '800', color: colors.DGRAY}}>
                {order.amount}
              </Fonts>
            </View>
          </View>
        </View>
      </View>
      {index === orderInformation.length - 1 && (
        <View style={styles.order_summary_container}>
          <Fonts type="boldBlack" style={{paddingBottom: 20}}>
            Summary
          </Fonts>
          <View style={styles.summary_container}>
            <View style={styles.text_spacing}>
              <Fonts type="normalBlackText">Total item costs </Fonts>
              <Fonts type="normalBlackText">Delivery fee</Fonts>
              <Fonts type="normalBlackText">Service fee</Fonts>
            </View>
            <View style={styles.text_spacing}>
              <Fonts type="normalBlackText">₦6800</Fonts>
              <Fonts type="normalBlackText">₦1500</Fonts>
              <Fonts type="normalBlackText">₦25</Fonts>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <>
      <FormMainContainer>
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.main_container}>
            <ScreenTitle
              screenTitle="ORDER CONFIRMATION"
              onPress={navigation.goBack}
            />
            <View>
              {renderPaymentMethod()}
              {renderDeliveryAddress()}
              <Fonts type="boldLightGray" style={{paddingTop: 15}}>
                Your Cart
              </Fonts>
              {orderInformation.map(renderOrder)}
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Fonts
                  type="boldLightGray"
                  style={{
                    color: colors.ORANGE,
                    textAlign: 'center',
                    paddingVertical: 50,
                  }}>
                  MODIFY CART
                </Fonts>
              </TouchableOpacity>
            </View>
            <View style={styles.terms_container}>
              <Fonts type="smallText">
                If you proceed, you are automatically accepting and acknowledge{' '}
                <Fonts type="smallText" style={{color: colors.ORANGE}}>
                  all terms and policies of Leeta
                </Fonts>
              </Fonts>
              <View style={styles.action}>
                <Fonts type="boldBlack"> Total</Fonts>
                <Fonts type="boldBlack"> ₦6800.00</Fonts>
              </View>
              <Buttons
                title="Checkout"
                disabled={false}
                textStyle={undefined}
                buttonStyle={undefined}
                onPress={handleModalVisibility}
              />
            </View>
          </View>
        </ScrollView>
      </FormMainContainer>
      <CustomModal visible={showModal} style={{flex: 1}}>
        <FormMainContainer>
          <TouchableOpacity onPress={handleCloseModal} style={styles.closeIcon}>
            <CANCEL_ICON />
          </TouchableOpacity>
          <View style={styles.success_msg_container}>
            <SUCCESS />
            <Fonts type="boldBlack" style={{color: colors.LGRAY}}>
              THANKS
            </Fonts>
            <Fonts
              type="normalGrayText"
              style={{color: colors.LGRAY, letterSpacing: 4}}>
              YOUR REFILL IS ON THE WAY
            </Fonts>
          </View>
          <View style={styles.button_container}>
            <Buttons
              title="Back To Homescreen"
              disabled={false}
              buttonStyle={undefined}
              textStyle={{fontSize: 17}}
              onPress={handleNavigateToHomeScreen}
            />
            <Buttons
              title="View Receipt"
              disabled={false}
              buttonStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: colors.ORANGE,
                width: '100%',
              }}
              textStyle={{color: colors.ORANGE, fontSize: 17}}
              onPress={handleModalVisibility}
            />
          </View>
        </FormMainContainer>
      </CustomModal>
    </>
  );
};

export default OrderConfirmation;
