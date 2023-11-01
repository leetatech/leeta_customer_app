import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    order_card: {
      backgroundColor: colors.WHITE,
      paddingBottom: 30,
      paddingTop: 60,
      paddingHorizontal: 15,
      position: 'relative',
      ...Platform.select({
        ios: {
          shadowColor: colors.LGRAY,
          shadowOffset: {width: 4, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
          zIndex: 3,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    screen_title: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 23,
      paddingTop:10
    },

    img: {
      position:'absolute',
      paddingTop:40,
      paddingLeft:15
     
    },
  });

export default createStyles;
