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
    toast_message: {
      backgroundColor: colors.YELLOW,
      color: colors.WHITE,
    },
  
  });

export default createStyles;

