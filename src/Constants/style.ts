import {StyleSheet} from 'react-native';
import {colors} from './Colors';

const createStyles = () =>
  StyleSheet.create({
    bold_light_gray: {
      color: colors.LGRAY,
      fontSize: 18,
      fontWeight: '500',
      margin: 0,
      padding: 0,
    },
    semi_bold_black: {
      color: colors.DGRAY,
      fontSize: 18,
      fontWeight: '500',
      margin: 0,
      padding: 0,
    },
    bold_black: {
      color: colors.DGRAY,
      fontSize: 18,
      fontWeight: '600',
      margin: 0,
      padding: 0,
    },
    normalGrayText: {
      color: colors.SLGRAY,
      fontSize: 15,
      fontWeight: '400',
    },
    normalBlackText: {
      color: colors.GRAY,
      fontSize: 15,
      fontWeight: '400',
    },
    small_text: {
      color: colors.BLACK,
    },
    extra_small_text: {
      color: colors.SLGRAY,
      fontSize: 11,
      fontWeight: '400',
    },
    extra_small_black_text: {
      fontSize: 11,
      fontWeight: '400',
    },
    normalText: {
      color: colors.DBLACK,
      fontSize: 15,
      fontWeight: '400',
    },
    normalBoldText: {
      color: colors.DGRAY,
      fontSize: 12,
      fontWeight: '700',
    },
    normalBoldBlackText: {
      fontSize: 12,
      fontWeight: '700',
    },
  });

export default createStyles;
