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
      fontSize: 16,
      fontWeight: '500',
      borderColor: colors.LGRAY,
      paddingVertical:15,
      paddingHorizontal:8,
      font:"300",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    error: {
      color: colors.RED,
      paddingTop: 4,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.LGRAY,
    },

  });

export default createStyles;
