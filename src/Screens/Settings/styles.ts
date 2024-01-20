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
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.BLACK,
      paddingTop: 10,
      textAlign: 'center',
    },
    description: {
      fontSize: 15,
      fontWeight: '400',
      color: colors.GRAY,
      textAlign: 'center',
      paddingTop: 5,
    },
    logout_container: {
      flexDirection: 'row',
      gap: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logout: {
      fontWeight: '600',
      color: colors.LIGHT_RED,
    },
    settings_options_container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 20,
    },
  });

export default createStyles;
