import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.WHITE,
      paddingHorizontal: 15,
      paddingVertical: 15,
      paddingTop: 20,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
    },
    modal: {
      flex: 1,
      margin: 0,
      justifyContent: 'flex-end',
    },
  });

export default createStyles;
