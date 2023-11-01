import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';


const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 5,
      paddingVertical: 25,
    },
    big_text: {
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.BLACK,
    },
    small_text: {
      fontSize: 20,
      fontWeight: '300',
      color: colors.BLACK,
    },
  });

export default createStyles;


