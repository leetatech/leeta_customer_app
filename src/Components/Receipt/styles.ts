import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    text_spacing: {
      gap: 8,
    },
    text_alighn_right: {
      textAlign: 'right',
    },
    receipt_container: {
      paddingHorizontal: 20,
    },
    summary_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.LGRAY,
      paddingBottom: 5,
    },
    card_container: {
      paddingTop: 20,
    },
    payment_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button_container: {
      paddingTop: 15,
    },
    payment_car_container: {
      paddingTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.LGRAY,
      paddingBottom: 10,
    },
    cta_container: {
      flexDirection: 'row',
      gap: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors.LGRAY,
      paddingBottom: 10,
      paddingTop: 10,
    },
    download_and_send_mail_container: {
      paddingBottom: 40,
    },
    receipt_name_container: {
      position: 'absolute',
      left: 20,
      bottom: 20,
      width: 150,
    },
  });

export default createStyles;
