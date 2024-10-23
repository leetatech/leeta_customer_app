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
      width: '100%',
      alignItems: 'center',
    },
    logout: {
      fontWeight: '600',
      color: colors.LIGHT_RED,
    },
    login: {
      fontWeight: '600',
      color: colors.ORANGE,
    },
    settings_options_container: {
      paddingHorizontal: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 20,
    },
    transparent_btn: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.SLGRAY,
    },
    transparent_btn_text: {
      color: colors.SLGRAY,
      fontWeight: '400',
      fontSize: 16,
    },
    btn: {
      backgroundColor: colors.RED,
      marginTop: 20,
    },
    btn_text: {
      color: colors.WHITE,
      fontWeight: '600',
      fontSize: 16,
    },
    modal_container: {
      backgroundColor: colors.WHITE,
      paddingHorizontal: 15,
      paddingVertical: 15,
      gap: 8,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
    },
    modal_title: {alignItems: 'center'},
    line_height: {
      marginBottom: 14,
    },
    btn_container: {paddingTop: 28},
  });

export default createStyles;
