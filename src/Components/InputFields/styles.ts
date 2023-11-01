import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      padding: 2,
    },
    input: {
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 7,
      fontSize: 16,
      fontWeight: '500',
      borderColor: colors.LGRAY,
      height: 50,
      justifyContent: 'center',
      alignContent: 'center',
    },
    error: {
      color: colors.RED,
      paddingTop: 4,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.LGRAY,
      paddingBottom: 10,
    },

  });

export default createStyles;
