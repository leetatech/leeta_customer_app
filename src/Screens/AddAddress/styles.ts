import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    main_container: {
      flex: 1,
    },

    form_main_container: {
      paddingTop: 10,
      gap: 5,
    },
    button_container: {
      paddingTop: 15,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      gap: 6,
    },
    listSate: {
      width: '100%',
      gap: 8,
    },
    item_neutral: {
      lineHeight: 28,
      alignSelf: 'center',
      width: 100,
    },
    selectedItemStyle: {
      backgroundColor: colors.XLGRAY,
      borderRadius: 20,
    },
    item_selected: {
      lineHeight: 28,
      alignSelf: 'center',
      width: 100,
      color: colors.BLACK,
    },
  });

export default createStyles;
