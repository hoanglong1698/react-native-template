/*
 * 1. Color Keys (Synchronized with --color-[key] in src/constants/theme.ts)
 * Output example:
 * {
 *   primary: 'var(--color-primary)',
 *   secondary: 'var(--color-secondary)',
 *   ...
 * }
 */
const COLOR_KEYS = ['primary', 'secondary', 'outstand', 'background', 'textDefault'];

const colorsConfig = COLOR_KEYS.reduce((acc, key) => {
  acc[key] = `var(--color-${key})`;
  return acc;
}, {});

/*
 * 2. Font Family Config (Synchronized with FONTS in src/constants/typography.ts)
 * Output example:
 * {
 *   inter: ['Inter-Regular'],
 *   'inter-bold': ['Inter-Bold'],
 *   ...
 * }
 */
const FONT_NAME = 'Inter';
const FONT_NAME_LOWERCASE = FONT_NAME.toLowerCase();
const FONT_MAP = {
  [FONT_NAME_LOWERCASE]: `${FONT_NAME}-Regular`,
  [`${FONT_NAME_LOWERCASE}-medium`]: `${FONT_NAME}-Medium`,
  [`${FONT_NAME_LOWERCASE}-semibold`]: `${FONT_NAME}-SemiBold`,
  [`${FONT_NAME_LOWERCASE}-bold`]: `${FONT_NAME}-Bold`,
  [`${FONT_NAME_LOWERCASE}-italic`]: `${FONT_NAME}-Italic`,
};

const fontFamilyConfig = Object.entries(FONT_MAP).reduce((acc, [key, fontFile]) => {
  acc[key] = [fontFile];
  return acc;
}, {});

/*
 * 3. Font Size Config (Synchronized with Typography in src/constants/typography.ts)
 * Output example:
 * {
 *   12: ['var(--font-size-12)', { lineHeight: 'var(--line-height-12)' }],
 *   14: ['var(--font-size-14)', { lineHeight: 'var(--line-height-14)' }],
 *   ...
 * }
 */
const FONT_SIZES = [8, 9, 10, 12, 14, 16, 18, 20, 24, 32, 40];

const fontSizeConfig = FONT_SIZES.reduce((acc, size) => {
  acc[size] = [`var(--font-size-${size})`, { lineHeight: `var(--line-height-${size})` }];
  return acc;
}, {});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: colorsConfig,
      fontFamily: fontFamilyConfig,
      fontSize: fontSizeConfig,
    },
  },
  plugins: [],
};
