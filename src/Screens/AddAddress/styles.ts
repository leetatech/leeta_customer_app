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
    modal_container: {
      height: 350,
      justifyContent: 'center',
      alignContent: 'center',
    },

    items_container: {
      width: '100%',
      paddingVertical: 20,
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
      position: 'absolute',
      top: 150,
      left: 0,
      right: 0,
      height: 35,
      backgroundColor: colors.XLGRAY,
      zIndex: -1,
      borderRadius: 15,
      marginHorizontal: 10,
    },
    overlayTop: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      opacity: 0.7,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    overlayBottom: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      opacity: 0.7,
    },
  });

export default createStyles;
