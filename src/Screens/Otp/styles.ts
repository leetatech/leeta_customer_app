import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 3,
    },
    container: {
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
      paddingVertical: 15,
    },

    input: {
      backgroundColor: colors.LGRAY,
      alignItems: 'center',
      borderRadius:0,
      height:10
    },
    inputText: {
      color: colors.BLACK,
      fontWeight: 'bold',
      fontSize: 20,
    },
 

    smalltext: {
      fontSize: 12,
      color: colors.GRAY,
      alignContent: 'center',
    },

    bigText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.BLACK,
    },

    otpContainer: {
      flex: 1,
    },

    resendOtp: {
      color: colors.ORANGE,
      textDecorationLine: 'underline',
      fontWeight: 'bold',
    },

    resendOtpContainer: {
      alignItems: 'center',
    },

    timer: {
      color: colors.GRAY,
    },

    buttonContainer: {
      bottom: 20,
    },

    borderStyleHighLighted: {
      borderColor: '#03DAC6',
    },

    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
      borderColor: colors.LGRAY,
    },

    toast_message: {
      backgroundColor: colors.YELLOW,
      color: colors.WHITE,
    },
    modal_content_description: {
      fontSize: 15,
      fontWeight: '400',
      color: colors.GRAY,
      textAlign: 'center',
      paddingTop: 10,
    },
    modal_content_container: {
      gap: 20,
    },
  });

export default createStyles;
