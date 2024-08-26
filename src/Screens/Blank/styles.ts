import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 3,
    },
    container: {
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
      paddingVertical: 15,
    },
  });

export default createStyles;
