import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    main_container: {
      flexDirection: 'column',
      gap: 19,
    },
    container: {
      flexDirection: 'row',
      gap: 19,
      paddingTop: 20,
    },
    empty_cart_container:{
     flex:1,
     gap: 10,
     justifyContent: 'center',
     alignItems: 'center',
    },
    description: {
      paddingTop: 20,
      textAlign: 'center',
      color: colors.GRAY,
      fontSize: 17,
    },
    description_container: {
      paddingVertical: 10,
    },
    action: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,

    },
    bold_txt: {
      fontWeight: '800',
    },
    gray_txt: {color: colors.GRAY, lineHeight: 20},
    orders_container:{
     flex:1,
     // height:300
    }
   
  });

export default createStyles;
