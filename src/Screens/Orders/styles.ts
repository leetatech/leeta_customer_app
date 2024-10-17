import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    main_container: {
      backgroundColor: colors.WHITE,
      flex: 1,
    },
    scrollable_tabs_container: {
      flexDirection: 'row',
      alignItems: 'flex-end'
      // paddingVertical: 10,
      // height: 100,
    },
    order_description_container: {
      flexDirection: 'row',
      gap: 20,
      paddingTop: 20,
      borderBottomColor: colors.LGRAY,
      borderBottomWidth: 1,
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
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    cancelled_orders_status_container: {
      padding: 2,
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    open_orders_status_container: {
      backgroundColor: colors.ORANGE,
      padding: 2,
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    order_desc_container: {gap: 3},
    scrollContainerEmpty: {
      // paddingBottom: 300,
      justifyContent: 'center',
      alignItems: 'center',
      // flex: 1,
      height: '89%',
    },
    scrollContainer: {
      // paddingBottom: 60,
      // flex: 1,
      height: '89%',
    },
    empty_cart_container: {
      // flex: 1,
      // gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bold_txt: {
      fontWeight: '800',
    },
    gray_txt: {color: colors.GRAY, lineHeight: 20},
    full_height: {flex: 1, height: '100%'},
  });

export default createStyles;
