import {StyleSheet} from 'react-native';
import { colors } from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
  
    container: {
     flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    otp:{
     color:colors.BLACK
    }
  });

export default createStyles;
