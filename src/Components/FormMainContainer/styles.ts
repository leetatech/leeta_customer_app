import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';


const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingTop: 60,
      flex: 1,
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: colors.WHITE,
    },
  });

export default createStyles;

