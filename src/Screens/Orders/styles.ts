import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    main_container: {
      backgroundColor: colors.WHITE,
      flex: 1,
    },
    container: {
      backgroundColor: colors.WHITE,
      paddingHorizontal: 15,
    },

    order_description_container: {
      flexDirection: 'row',
      gap: 20,
      paddingTop: 20,
      borderBottomColor: colors.XLGRAY,
      borderBottomWidth: 2,
    },
    order_container: {
      paddingVertical: 20,
      marginBottom: 20,
    },

    activeContainer: {
      borderColor: colors.ORANGE,
      borderBottomWidth: 2,
    },
    inactiveContainer: {
      borderColor: colors.TRANSPARENT,

      borderBottomWidth: 0,
    },
  });

export default createStyles;
