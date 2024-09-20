import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.LYELLOW,
      paddingHorizontal: 25,
      paddingVertical: 20,
      paddingTop: 20,
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      margin:0,
      justifyContent:'center',
    },
    modal: {
      right:10
    },
    message_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

export default createStyles;
