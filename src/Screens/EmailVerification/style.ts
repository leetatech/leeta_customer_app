import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     paddingHorizontal:15,
     backgroundColor:colors.WHITE
    },

    buttonStyle:{
     width: '100%',
    },
   title: {
     fontSize: 20,
     fontWeight: 'bold',
     color: colors.BLACK,
     paddingTop: 20,
   },
   description: {
     fontSize: 15,
     fontWeight: '400',
     color: colors.GRAY,
     textAlign: 'center',
     paddingTop: 10,
   },
   btn_container: {
     marginTop: 30,
     width: '100%',
   },
 
  });

export default createStyles;
