import {StyleSheet} from 'react-native';
import { colors } from './Colors';

const createStyles = () =>
  StyleSheet.create({
     bold_light_gray :{
          color:colors.LGRAY,
          fontSize: 18,
          fontWeight:'500',
          margin: 0,
          padding: 0,
        },
        semi_bold_black :{
          color:colors.DGRAY,
          fontSize: 18,
          fontWeight:'500',
          margin: 0,
          padding: 0,
        },
        bold_black:{
          color:colors.DGRAY,
          fontSize: 18,
          fontWeight:'600',
          margin: 0,
          padding: 0,
        },
        normalGrayText:{
          color:colors.SLGRAY,
          fontSize: 15,
          fontWeight:'400'
        },
        normalBlackText:{
          color:colors.GRAY,
          fontSize: 15,
          fontWeight:'400'
        },
        small_text :{
          color:colors.BLACK
        }
   
  });

export default createStyles;