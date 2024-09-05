import {Platform, StyleSheet,Dimensions} from 'react-native';
import {colors} from '../../Constants/Colors';
let screenWidth = Dimensions.get('window').width;

const isSmallDevice = screenWidth < 380;
const createStyles = () =>
  StyleSheet.create({
    nav_card: {
      backgroundColor: colors.WHITE,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: isSmallDevice ? 20 : 0,
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
      fontSize: 18,
      marginRight: 40,
      letterSpacing:0.5,
      flex: 1, 
    },
  });

export default createStyles;
