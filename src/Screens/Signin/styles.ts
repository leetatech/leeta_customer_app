import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 19,
    },
    buttonContainer: {
      paddingBottom: 40,
    },

    passwordIcon: {
      position: 'absolute',
      right: 15,
      top: 15,
      zIndex: 1,
    },
    mainContainer: {
      flex: 1,
    },
    fp: {
      color: colors.ORANGE,
      paddingTop: 15,
      textDecorationLine: 'underline',
    },
    modal_description_container: {
      justifyContent: 'center',
      alignItems: 'center',
      letterSpacing: 30,
    },
    modal_content_title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.BLACK,
      paddingTop: 20,
    },
    modal_content_description: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.GRAY,
      textAlign: 'center',
      paddingTop: 10,
    },
    modal_btn_container: {
      marginTop: 30,
    },
  });

export default createStyles;
