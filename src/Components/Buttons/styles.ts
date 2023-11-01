import {StyleSheet} from 'react-native';
import { colors } from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
  
    button: {
     padding: 15,
     width:'100%',
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius:10,
    },
    order_button: {
      padding: 13,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal:35
     },
    text: {
     fontSize:20,
     fontWeight: 'bold',
     color:colors.WHITE
    },
    textStyle :{
      color:colors.GRAY,
      fontWeight: 'bold',
      fontSize:18,
      marginTop:5,
      alignSelf: 'center'
      
    },
    coloredText :{
      color:colors.ORANGE,
    }
  });

export default createStyles;
