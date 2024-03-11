import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    main_container :{
      flex: 1
    },
    text_spacing :{
gap:3
    },
    checkbox_container: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    payment_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
    },
    card_style: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.LGRAY,
    },
    address :{
      width: 200,
      gap:3
    },
    amount_container:{
      flexDirection:'row',
       gap:3
    },
    summary_container :{
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    order_summary_container :{
      paddingTop: 20,

    },
    action: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    terms_container:{
      gap: 5,
    },
    closeIcon : {
      position: 'absolute',
      top: 50, 
      right: 10,
    },
  success_msg_container :{
    marginTop:30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  button_container :{
    paddingTop: 15
  },
   iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  });

export default createStyles;
