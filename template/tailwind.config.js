/*
 * 1. Color Keys (Synchronized with --color-[key] in src/constants/theme.ts)
 * Output example:
 * {
 *   primary: 'var(--color-primary)',
 *   secondary: 'var(--color-secondary)',
 *   ...
 * }
 */
const COLOR_KEYS = [
  'white',
  'black',
  'red',
  'primary',
  'secondary',
  'outstand',
  'background',
  'textDefault',
  'borderDefault',
];

const colorsConfig = COLOR_KEYS.reduce((acc, key) => {
  acc[key] = `var(--color-${key})`;
  return acc;
}, {});

/*
 * 2. Font Family Config (Synchronized with FONTS in src/constants/typography.ts)
 * Output example:
 * {
 *   regular: ['Inter-Regular'],
 *   bold: ['Inter-Bold'],
 *   ...
 * }
 */
const FONT_NAME = 'Inter';
const FONT_MAP = {
  regular: `${FONT_NAME}-Regular`,
  medium: `${FONT_NAME}-Medium`,
  semibold: `${FONT_NAME}-SemiBold`,
  bold: `${FONT_NAME}-Bold`,
  italic: `${FONT_NAME}-Italic`,
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

/*
 * 4. Size Config (Spacing, Border Radius, etc.)
 * Output example:
 * {
 *   0: 'var(--size-0)',
 *   4: 'var(--size-4)',
 *   16: 'var(--size-16)',
 *   ...
 * }
 */
const NUMERIC_SIZES = Array.from({ length: 51 }, (_, i) => i);

const sizeConfig = NUMERIC_SIZES.reduce((acc, size) => {
  acc[size] = `var(--size-${size})`;
  return acc;
}, {});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  corePlugins: {
    fontWeight: false,
  },
  theme: {
    colors: colorsConfig,
    fontFamily: fontFamilyConfig,
    fontSize: fontSizeConfig,
    spacing: sizeConfig,
    borderRadius: { ...sizeConfig, DEFAULT: '4px' },
  },
  plugins: [],
};
