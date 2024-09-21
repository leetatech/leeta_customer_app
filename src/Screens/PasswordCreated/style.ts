import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     paddingHorizontal:25,
     backgroundColor:colors.WHITE
    },
    buttonStyle:{
     width: '100%',
    },
   description: {
     textAlign: 'center',
     paddingTop: 10,
   },
   btn_container: {
     marginTop: 30,
     width: '100%',
   },
 
  });

export default createStyles;
