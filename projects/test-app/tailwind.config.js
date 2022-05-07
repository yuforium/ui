module.exports = {
  content: [
    './projects/test-app/src/**/*.{html,ts}',
    './projects/common/src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'josefin-sans': ['"Josefin Sans"', 'sans-serif'],
        'source-code-pro-sans': ['"Source Code Pro"', 'sans-serif'],
        'abz-sans': ['"ABeeZee"', 'sans-serif'],
      }
    },
  },
  plugins: [],
  corePlugins: {
  }
}
