module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',
  bracketSameLine: true,
  bracketSpacing: true,
  tabWidth: 2,
  printWidth: 120,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindAttributes: ['className'],
};
