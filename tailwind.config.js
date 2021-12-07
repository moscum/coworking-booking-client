module.exports = {
  mode: process.env.NODE_ENV && 'jit',
  important: true,
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        inter: 'var(--content-font-family)',
        manrope: 'var(--title-font-family)',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        'gray-1': 'var(--gray-1)',
        'gray-2': 'var(--gray-2)',
      },
      flex: {
        1: '1 1 0%',
        2: '2 2 0%',
      },
      borderRadius: {
        none: '0',
        DEFAULT: '.5rem',
        full: '9999px',
      },
      keyframes: {
        shine: {
          '0%': {
            backgroundPosition: 0,
            backgroundImage:
              'linear-gradient(90deg, #d0d0d0 0px, #f0f0f0 40px, #d0d0d0 80px)',
            backgroundSize: '400px',
          },
          '100%': {
            backgroundPosition: '400px',
            backgroundImage:
              'linear-gradient(90deg, #d0d0d0 0px, #f0f0f0 40px, #d0d0d0 80px)',
            backgroundSize: '400px',
          },
        },
      },
      animation: {
        shine: 'shine 2.4s infinite linear',
      },
    },
  },
  variants: {},
  plugins: [],
};
