import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from '../../Constants/Colors';
let screenWidth = Dimensions.get('window').width;

const isSmallDevice = screenWidth < 380;

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 19,
    },
    mainContainer: {
      flex: 1,
      paddingTop: 32,
      //   paddingHorizontal: 15,
      backgroundColor: colors.WHITE,
    },
    navigation_arrow_container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: colors.WHITE,
      //   paddingHorizontal: 15,
      //   paddingVertical: isSmallDevice ? 20 : 0,
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
    description: {
      textAlign: 'center',
      color: colors.GRAY,
      fontSize: 17,
      flex: 1,
    },
    pill_tag: {
      // backgroundColor: colors.ORANGE,
      marginTop: 2.4,
      flexDirection: 'row',
      fontSize: 12,
      color: colors.WHITE,
      padding: 1,
      fontWeight: '800',
      alignSelf: 'flex-start',
    },
    open_orders_status_container: {
      backgroundColor: colors.ORANGE,
      padding: 2,
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    statusContainer: {
      flexDirection: 'row',
      gap: 14,
    },
    historyBar: {
      alignItems: 'center',
      gap: 6,
    },
    historyContainer: {
      paddingHorizontal: 15,
      paddingVertical: 16,
    },
    svgStyle: {
      width: 21.77, // Style width
      height: 21.77, // Style height
    },
    displayInfo: {
      gap: 2,
    },
  });

export default createStyles;
