import { scaleFont } from '@/utils';

const FONT_NAME = 'Inter';

export const FONTS = {
  /* -----------Normal----------- */
  /* 300 */ LIGHT: `${FONT_NAME}-Light`,
  /* 400 */ REGULAR: `${FONT_NAME}-Regular`,
  /* 500 */ MEDIUM: `${FONT_NAME}-Medium`,
  /* 600 */ SEMI_BOLD: `${FONT_NAME}-SemiBold`,
  /* 700 */ BOLD: `${FONT_NAME}-Bold`,
  /* -----------Italic----------- */
  /* 400 */ REGULAR_ITALIC: `${FONT_NAME}-Italic`,
};

export const Typography = {
  fs8: {
    fontSize: scaleFont(8),
    lineHeight: scaleFont(10),
  },
  fs9: {
    fontSize: scaleFont(9),
    lineHeight: scaleFont(12),
  },
  fs10: {
    fontSize: scaleFont(10),
    lineHeight: scaleFont(14),
  },
  fs12: {
    fontSize: scaleFont(12),
    lineHeight: scaleFont(16),
  },
  fs14: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(18),
  },
  fs16: {
    fontSize: scaleFont(16),
    lineHeight: scaleFont(20),
  },
  fs18: {
    fontSize: scaleFont(18),
    lineHeight: scaleFont(22),
  },
  fs20: {
    fontSize: scaleFont(20),
    lineHeight: scaleFont(24),
  },
  fs24: {
    fontSize: scaleFont(24),
    lineHeight: scaleFont(32),
  },
  fs32: {
    fontSize: scaleFont(32),
    lineHeight: scaleFont(40),
  },
  fs40: {
    fontSize: scaleFont(40),
    lineHeight: scaleFont(50),
  },
  fw300: {
    fontFamily: FONTS.LIGHT,
  },
  fw400: {
    fontFamily: FONTS.REGULAR,
  },
  fw400_Italic: {
    fontFamily: FONTS.REGULAR_ITALIC,
    fontStyle: 'italic',
  },
  fw500: {
    fontFamily: FONTS.MEDIUM,
  },
  fw600: {
    fontFamily: FONTS.SEMI_BOLD,
  },
  fw700: {
    fontFamily: FONTS.BOLD,
  },
  light: {
    fontFamily: FONTS.LIGHT,
  },
  regular: {
    fontFamily: FONTS.REGULAR,
  },
  regularItalic: {
    fontFamily: FONTS.REGULAR_ITALIC,
    fontStyle: 'italic',
  },
  medium: {
    fontFamily: FONTS.MEDIUM,
  },
  semibold: {
    fontFamily: FONTS.SEMI_BOLD,
  },
  bold: {
    fontFamily: FONTS.BOLD,
  },
};
