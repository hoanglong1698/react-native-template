/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        outstand: 'var(--color-outstand)',
        background: 'var(--color-background)',
        textDefault: 'var(--color-textDefault)',
      },
      fontFamily: {
        inter: ['Inter-Regular'],
        'inter-bold': ['Inter-Bold'],
        'inter-italic': ['Inter-Italic'],
        'inter-medium': ['Inter-Medium'],
        'inter-semibold': ['Inter-SemiBold'],
      },
      fontSize: {
        dynamic: 'var(--font-size-dynamic)',
        12: 12,
        14: 14,
        16: 16,
      },
    },
  },
  plugins: [],
};
