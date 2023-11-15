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
  });

export default createStyles;
