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
      paddingHorizontal: 15,
      backgroundColor: colors.WHITE,
    },
    nav_card: {
      backgroundColor: colors.WHITE,
      paddingHorizontal: 15,
      ...Platform.select({
        ios: {
          shadowColor: colors.LGRAY,
          shadowOpacity: 0.2,
          shadowRadius: 4,
          zIndex: 3,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    nav_card2: {
      backgroundColor: colors.WHITE,
      borderBottomWidth: 0.5,
      borderColor: colors.ORANGE,
      paddingBottom: 5,
    },
    screen_title: {
      fontWeight: 'bold',
      fontSize: 18,
      marginRight: 40,
      letterSpacing: 0.5,
      flex: 1,
    },
    gray_txt_sm: {
      color: colors.GRAY,
      fontSize: 10,
    },
    orders_container: {
      flex: 1,
      marginTop: 30.57,
      marginBottom: 40.84,
      flexDirection: 'row',
      gap: 16.17,
      alignItems: 'center',
    },
    description_container: {
      paddingVertical: 10,
    },
    bold_txt: {
      fontWeight: '800',
    },
    gray_txt: {color: colors.GRAY, lineHeight: 20},
    amount_container: {
      flexDirection: 'row',
      gap: 3,
      alignItems: 'flex-end',
    },
    pill_tag: {
      backgroundColor: colors.ORANGE,
      marginTop: 2.4,
      flexDirection: 'row',
      fontSize: 12,
      color: colors.WHITE,
      padding: 2,
      fontWeight: '800',
      alignSelf: 'flex-start',
    },
    text: {
      lineHeight: 34,
      fontSize: 16,
    },
  });

export default createStyles;
