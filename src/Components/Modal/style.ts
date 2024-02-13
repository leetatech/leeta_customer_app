import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1, justifyContent: 'flex-end'
    },
    children_container:{
      backgroundColor: colors.WHITE,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 20,
    },
    modal: {
      flex: 1,
      margin: 0,
      justifyContent: 'flex-end',
    },
  });

export default createStyles;
