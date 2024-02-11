import {StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';

const createStyles = () =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    button_container: {
      position: 'absolute',
      bottom:0
    },
    modal_actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.XLGRAY,
      paddingVertical: 10,
    },
    weight_options_container: {
      paddingVertical: 13,
      fontSize: 18,
      borderBottomColor: colors.XLGRAY,
      borderBottomWidth: 1,
      justifyContent: 'center',
      paddingTop: 10,
      flexGrow: 1,
    },
    weight_options_main_container: {
      height: 300,
      marginBottom: 15,
    },
    text_color: {
      color: colors.GRAY,
      fontWeight: '600',
      fontSize: 15,
    },
    input_weight_container: {
      gap: 10,
    },
    input_weight_and_unit_container: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.LGRAY,
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 5,
      alignContent: 'center',
    },
    input_style: {
      fontWeight: '700',
      fontSize: 20,
      letterSpacing: 2,
    },
    unit: {
      paddingTop: 8,
      fontWeight: '600',
    },
  });

export default createStyles;
