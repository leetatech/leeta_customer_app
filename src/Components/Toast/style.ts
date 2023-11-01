import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.LYELLOW,
      paddingHorizontal: 15,
      paddingVertical: 15,
      paddingTop: 20,
      position: 'absolute',
      top: 55,
      left: 0,
      right: 0,
    },
    modal: {
      flex: 1,
      margin: 0,
      justifyContent: 'flex-end',
    },
    message_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

export default createStyles;
