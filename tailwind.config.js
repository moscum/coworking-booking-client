module.exports = {
  mode: process.env.NODE_ENV && 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      'secondary-light': 'var(--secondary-light)',
      accent: 'var(--accent)',
      black: 'var(--black)',
      white: 'var(--white)',
      green: 'var(--green)',
      'gray-1': 'var(--gray-1)',
      'gray-2': 'var(--gray-2)',
    },
    fontFamily: {
      inter: 'var(--content-font-family)',
      montserrat: 'var(--title-font-family)',
    },
  },
  variants: {},
  plugins: [],
};
