export enum ThemesVariant {
  LIGHT = 'light',
  DARK = 'dark',
}

export const CommonColors = {
  buttercup: '#F0B90B',
  carouselPink: '#FAE4E8',
  white: '#FFFFFF',
  black: '#000000',
  red: '#ff0000',
};

export const LightColors = {
  ...CommonColors,
  primary: '#857CD9',
  secondary: '#8A8AA8',
  background: '#F9F9FB',
  outstand: '#2288dd',
  textDefault: '#20303C',
  borderDefault: '#E8ECF0',
};

export const DarkColors = {
  ...CommonColors,
  primary: '#857CD9',
  secondary: '#A5A5C0',
  background: '#2A2A45',
  outstand: '#552288',
  textDefault: '#FFFFFF',
  borderDefault: '#E8ECF0',
};

export type ColorsType = typeof LightColors;
