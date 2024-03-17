import React, {FC, useMemo} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import Fonts from '../../Constants/Fonts';
import {CARD_ICON} from '../../Assets/svgImages';
import {colors} from '../../Constants/Colors';
import createStyles from './styles';
import Buttons from '../Buttons/Buttons';
import {BACKGROUND_IMAGE, DOWNLOAD_ICON, EMAIL_ICON} from '../../Assets';

const orderInformation = [
  {
    deliveryAddress: 'Alfred Rewane Street',
    deliveredTo: 'Becky Anderson',
    deliveryType: 'Same day',
    title: 'Max Gas',
    type: 'Refill',
    weight: '10Kg',
  },
];
export const Receipt: FC = () => {
  const styles = useMemo(() => createStyles(), []);

  const renderSummaryDetails = () => {
    return orderInformation.map((datum, index) => (
      <View style={styles.text_spacing} key={index}>
        {Object.entries(datum).map(([key, value]) => (
          <Fonts key={key} type="normalText" style={styles.text_alighn_right}>
            {value}
          </Fonts>
        ))}
      </View>
    ));
  };

  return (
    <>
      <View>
        <Image
          source={BACKGROUND_IMAGE}
          style={{width: '100%'}}
          resizeMode="stretch"
        />
        <View style={styles.receipt_name_container}>
          <Fonts
            type="boldBlack"
            style={{color: colors.DBLACK, lineHeight: 25}}>
            Thank you for your refill, Becky
          </Fonts>
          <Fonts type="smallText">Oct 20, 2023 3:14PM ₦8,325.00</Fonts>
        </View>
      </View>
      <View style={styles.receipt_container}>
        <View style={styles.card_container}>
          <Fonts type="boldBlack" style={{paddingBottom: 20}}>
            Summary
          </Fonts>
          <View style={styles.summary_container}>
            <View style={styles.text_spacing}>
              <Fonts type="normalText">Delivery address</Fonts>
              <Fonts type="normalText">Delivered to</Fonts>
              <Fonts type="normalText">Delivery type</Fonts>
              <Fonts type="normalText">Vendor</Fonts>
              <Fonts type="normalText">Quantity </Fonts>
              <Fonts type="normalText">Item ordered</Fonts>
            </View>
            {renderSummaryDetails()}
          </View>
        </View>
        <View style={[styles.summary_container, {paddingTop: 30}]}>
          <View style={styles.text_spacing}>
            <Fonts type="semiBoldBlack">Subtotal</Fonts>
            <Fonts type="normalText">Delivery fee </Fonts>
            <Fonts type="normalText">Service fee </Fonts>
          </View>
          <View style={styles.text_spacing}>
            <Fonts type="semiBoldBlack" style={{textAlign: 'right'}}>
              ₦6,800.00
            </Fonts>
            <Fonts type="normalText" style={{textAlign: 'right'}}>
              ₦1,500.00
            </Fonts>
            <Fonts type="normalText" style={{textAlign: 'right'}}>
              ₦25.00
            </Fonts>
          </View>
        </View>
        <View style={styles.payment_car_container}>
          <Fonts type="boldBlack" style={{paddingBottom: 20}}>
            Payment Method
          </Fonts>
          <View style={styles.payment_container}>
            <Fonts type="normalText">Pay On Delivery</Fonts>
            <CARD_ICON />
          </View>
        </View>
        <View style={styles.button_container}>
          <Buttons
            title="Track Item"
            disabled={false}
            buttonStyle={undefined}
            textStyle={undefined}
          />
        </View>
        <View style={styles.download_and_send_mail_container}>
          <View style={styles.cta_container}>
            <Image source={DOWNLOAD_ICON} />
            <TouchableOpacity>
              <Fonts type="normalText">Download PDF</Fonts>
            </TouchableOpacity>
          </View>
          <View style={styles.cta_container}>
            <Image source={EMAIL_ICON} />
            <TouchableOpacity>
              <Fonts type="normalText">Resend Email</Fonts>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
