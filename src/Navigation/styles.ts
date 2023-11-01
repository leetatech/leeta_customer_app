import {StyleSheet} from 'react-native';
import {colors} from '../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
    },
    name_container: {
      backgroundColor: colors.BLUE,
      width: 40,
      height: 40,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },
    name_and_email_container: {
      flexDirection: 'row',
      gap: 8,
      paddingVertical: 5,
    },
    drawer_components: {
      gap: -10,
      marginLeft: -15,
    },
    logout_container: {
      flexDirection: 'row',
      gap: 4,
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    logout: {
      fontWeight: '600',
      color: colors.RED,
      paddingTop: 3,
    },
  });

export default createStyles;
