import { vars } from 'nativewind';

export enum ThemesVariant {
  LIGHT = 'light',
  DARK = 'dark',
}

export const CommonColors = {
  buttercup: '#F0B90B',
  carouselPink: '#FAE4E8',
};

export const LightColors = {
  ...CommonColors,
  primary: '#857CD9',
  secondary: '#8A8AA8',
  background: '#F9F9FB',
  outstand: '#2288dd',
  textDefault: '#3D435C',
};

export const DarkColors = {
  ...CommonColors,
  primary: '#857CD9',
  secondary: '#A5A5C0',
  background: '#2A2A45',
  outstand: '#552288',
  textDefault: '#FFFFFF',
};

export const ColorPalette = {
  light: vars({
    '--color-primary': LightColors.primary,
    '--color-secondary': LightColors.secondary,
    '--color-outstand': LightColors.outstand,
    '--color-background': LightColors.background,
    '--color-textDefault': LightColors.textDefault,
  }),
  dark: vars({
    '--color-primary': DarkColors.primary,
    '--color-secondary': DarkColors.secondary,
    '--color-outstand': DarkColors.outstand,
    '--color-background': DarkColors.background,
    '--color-textDefault': DarkColors.textDefault,
  }),
};

export type ColorsType = typeof LightColors;
