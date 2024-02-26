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
      textAlign: 'center',
      color: colors.GRAY,
      fontSize: 17,
      flex: 1, 
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
     paddingTop:10
     
    },
    navigation_arrow_container: {
      flexDirection: 'row',
       alignItems: 'center',
       paddingVertical: 10
    },
    terms_container:{
      paddingVertical:20,
      gap: 5
    },
    amount_container:{
      flexDirection:'row',
       gap:3
    },
    cart_item_cta_container :{
      flexDirection: 'row',
       gap: 9
    },
    modal_container :{
      backgroundColor:colors.WHITE,
       paddingHorizontal:15,
        paddingVertical:15,
         gap:8
    },
    modal_title :{
      fontSize:20, 
      fontWeight:'600',
      color:colors.BLACK
    },
     modal_description:{
      fontSize:18,
        color:colors.GRAY,
        paddingTop:10,
     }
   
  });

export default createStyles;
