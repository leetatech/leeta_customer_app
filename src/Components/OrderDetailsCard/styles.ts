import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor:colors.WHITE,
     //  flex:1
    },
    title: {
      fontWeight: '400',
      fontSize: 18,
    },
    order_details:{
     fontWeight: '400',
     fontSize: 18,
     paddingVertical:8,
     paddingTop:40
    },
    profile_container: {
      paddingTop: 10,
      gap: 8,
    },
    profile_detail:{
     color:colors.BLACK,
     fontWeight:'300'
    },
    profile_detail_container:{
     flexDirection:'row',
     gap:5
    }
  });

export default createStyles;
