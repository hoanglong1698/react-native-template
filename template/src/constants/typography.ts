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
    fontSize: 8,
    lineHeight: 10,
  },
  fs9: {
    fontSize: 9,
    lineHeight: 12,
  },
  fs10: {
    fontSize: 10,
    lineHeight: 14,
  },
  fs12: {
    fontSize: 12,
    lineHeight: 16,
  },
  fs14: {
    fontSize: 14,
    lineHeight: 18,
  },
  fs16: {
    fontSize: 16,
    lineHeight: 20,
  },
  fs18: {
    fontSize: 18,
    lineHeight: 22,
  },
  fs20: {
    fontSize: 20,
    lineHeight: 24,
  },
  fs24: {
    fontSize: 24,
    lineHeight: 32,
  },
  fs32: {
    fontSize: 32,
    lineHeight: 40,
  },
  fs40: {
    fontSize: 40,
    lineHeight: 50,
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
};
