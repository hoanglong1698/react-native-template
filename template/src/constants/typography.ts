import { scaleFont } from './../helpers/responsive';

const FontName = 'Inter';

export const Fonts = {
  /* -----------Normal----------- */
  /* 300 */ Light: `${FontName}-Light`,
  /* 400 */ Regular: `${FontName}-Regular`,
  /* 500 */ Medium: `${FontName}-Medium`,
  /* 600 */ SemiBold: `${FontName}-SemiBold`,
  /* 700 */ Bold: `${FontName}-Bold`,
  /* -----------Italic----------- */
  /* 400 */ RegularItalic: `${FontName}-Italic`,
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
    fontFamily: Fonts.Light,
  },
  fw400: {
    fontFamily: Fonts.Regular,
  },
  fw400_Italic: {
    fontFamily: Fonts.RegularItalic,
    fontStyle: 'italic',
  },
  fw500: {
    fontFamily: Fonts.Medium,
  },
  fw600: {
    fontFamily: Fonts.SemiBold,
  },
  fw700: {
    fontFamily: Fonts.Bold,
  },
  light: {
    fontFamily: Fonts.Light,
  },
  regular: {
    fontFamily: Fonts.Regular,
  },
  regularItalic: {
    fontFamily: Fonts.RegularItalic,
    fontStyle: 'italic',
  },
  medium: {
    fontFamily: Fonts.Medium,
  },
  semibold: {
    fontFamily: Fonts.SemiBold,
  },
  bold: {
    fontFamily: Fonts.Bold,
  },
};
