module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        /* prettier-ignore */
        '21.51': '21.51rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
