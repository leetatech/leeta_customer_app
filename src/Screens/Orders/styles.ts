import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 20,
      backgroundColor: colors.WHITE,
      paddingHorizontal: 15,
    },
  });

export default createStyles;
