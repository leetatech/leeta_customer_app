import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    cylinder_description:{
      color:colors.BLACK,
      fontSize:20,
      fontWeight:'500',
      lineHeight:20,
      
    },
    date:{
      color:colors.GRAY,
      fontSize:18,
    },
    order_status:{
      color:colors.YELLOW,
      fontSize:16,
    },
  image:{
    width:56,
    height:56
  }
 
  });

export default createStyles;