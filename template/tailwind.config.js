/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        outstand: 'var(--color-outstand)',
        background: 'var(--color-background)',
        textColor: 'var(--color-text)',
      },
    },
  },
  plugins: [],
}

