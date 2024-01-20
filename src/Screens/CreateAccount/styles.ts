import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 19,
    },
    buttonContainer: {
      paddingBottom: 20,
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
    checkbox: {
      paddingTop: 4,
      width: 15,
      height: 15,
      borderWidth: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    fp: {
      color: colors.GRAY,
      paddingTop: 4,
    },
    checkboxContainer: {
      flexDirection: 'row',
      paddingBottom: 24,
      alignItems: 'center',
      paddingVertical: 20,
      gap: 6,
    },
    link: {
      color: colors.ORANGE,
      textDecorationLine: 'underline',
      paddingRight: 4,
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
