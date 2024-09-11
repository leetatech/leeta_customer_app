import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    main_container: {
      flex: 1,
    },
    text_spacing: {
      gap: 3,
    },
    checkbox_container: {
      flexDirection: 'row',
      gap: 8,
      paddingVertical: 10,
      width: 300,
    },
    payment_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.LGRAY,
      paddingVertical: 10,
    },
    address_container :{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card_style: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.LGRAY,
    },
    address: {
      width: 200,
      gap: 3,
    },
    amount_container: {
      flexDirection: 'row',
      gap: 3,
    },
    summary_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    order_summary_container: {
      paddingTop: 20,
    },
    action: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    terms_container: {
      gap: 5,
    },
    error_modal_container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 30,
    },
    success_msg_container: {
      marginTop: 100,
      alignItems: 'center',
      gap: 6,
    },
    button_container: {
      paddingTop: 15,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal_container: {
      flex: 1,
      padding: 0,
    },
    view_receipt_btn: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.ORANGE,
      width: '100%',
    },
    refill_msg: {
      color: colors.LGRAY,
    },
    letter_spacing: {
      letterSpacing: 4,
    },
    view_receipt_text: {
      color: colors.ORANGE,
      fontSize: 17,
    },
    icon_style: {
      marginTop: 3,
    },
  });

export default createStyles;
