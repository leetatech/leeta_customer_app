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

    items_container: {
      paddingVertical: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    item_text: {
      color: colors.GRAY,
    },
    pressed_item_text: {
      color: colors.ORANGE,
    },
    active_item_text: {
      color: 'black',
    },
    item: {
      height: 40,
      justifyContent: 'center',
    },
    highlightOverlay: {
      width:'100%',
      alignItems:'center',
      height: 35,
      backgroundColor: colors.XLGRAY,
      zIndex: -1,
      borderRadius: 15,
      marginHorizontal: 10,
    },

  });

export default createStyles;
