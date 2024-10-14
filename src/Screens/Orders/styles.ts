import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    main_container: {
      backgroundColor: colors.WHITE,
      flex: 1,
    },
    order_description_container: {
      flexDirection: 'row',
      gap: 20,
      paddingTop: 20,
      borderBottomColor: colors.XLGRAY,
      borderBottomWidth: 2,
      paddingHorizontal: 10,
    },
    activeContainer: {
      borderColor: colors.ORANGE,
      borderBottomWidth: 2,
    },
    inactiveContainer: {
      borderColor: colors.TRANSPARENT,
      borderBottomWidth: 0,
    },

    order_container: {
      flexDirection: 'row',
      gap: 20,
    },
    all_orders_status_container: {
      backgroundColor: colors.LEMON,
      padding: 2,
    },
    cancelled_orders_status_container: {
      backgroundColor: colors.RED,
      padding: 2,
    },
    order_desc_container: {gap: 3},
    scrollContainer: {
      paddingBottom: 60,
    },
  });

export default createStyles;
