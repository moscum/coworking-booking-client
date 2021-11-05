module.exports = {
  mode: process.env.NODE_ENV && 'jit',
  important: true,
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      accent: 'var(--accent)',
      black: 'var(--black)',
      white: 'var(--white)',
      success: 'var(--success)',
      'gray-1': 'var(--gray-1)',
      'gray-2': 'var(--gray-2)',
    },
    fontFamily: {
      inter: 'var(--content-font-family)',
      manrope: 'var(--title-font-family)',
    },
    borderRadius: {
      none: '0',
      DEFAULT: '.5rem',
      full: '9999px',
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      none: 'none',
      2: '2 2 0%',
    },
  },
  variants: {},
  plugins: [],
};
