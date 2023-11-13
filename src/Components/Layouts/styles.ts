import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1,
      paddingHorizontal: 13,
      backgroundColor: colors.WHITE,
    },
  });

export default createStyles;