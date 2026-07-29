import { vars } from 'nativewind';
import { ColorsType, DarkColors, LightColors } from './theme';
import { Typography } from './typography';

const createColorVars = (colors: ColorsType) => {
  const varsObj = Object.entries(colors).reduce(
    (acc, [key, value]) => {
      acc[`--color-${key}`] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return vars(varsObj);
};

export const ColorVars = {
  light: createColorVars(LightColors),
  dark: createColorVars(DarkColors),
};

const createTypographyVars = () => {
  const varsObj = (Object.keys(Typography) as (keyof typeof Typography)[]).reduce(
    (acc, key) => {
      const style = Typography[key];
      if ('fontSize' in style && 'lineHeight' in style) {
        const sizeNumber = key.replace('fs', '');
        acc[`--font-size-${sizeNumber}`] = `${style.fontSize}px`;
        acc[`--line-height-${sizeNumber}`] = `${style.lineHeight}px`;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return vars(varsObj);
};

export const TypographyVars = createTypographyVars();
