import { StyleSheet } from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 19,
    },
    buttonContainer: {
      marginTop: 20,
      paddingBottom: 20,
      paddingTop: 20,
    },
    mainContainer: {
      flex: 1,
    },
    passwordIcon: {
      position: 'absolute',
      right: 15,
      top: 15,
      zIndex: 1,
    },
    fp: {
      color: colors.ORANGE,
      paddingTop: 15,
      textDecorationLine: 'underline',
    },
    confirmPasswordContainer: {
      marginTop: 20,
    },
  });

export default createStyles;
