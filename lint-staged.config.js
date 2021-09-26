module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'yarn run build-types',
  '*.json': ['prettier --write'],
  '**/*.{css,scss}': [
    'stylelint "**/*.{css,scss}" --fix',
    'prettier --write',
    'stylelint "**/*.{css,scss}"',
  ],
};
