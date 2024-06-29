/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
    // './projects/test-app/src/**/*.{html,ts}',
    // './projects/common/src/**/*.{html,ts}'
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
  plugins: [
    require('@tailwindcss/forms'),
    // require('daisyui')
  ],
  corePlugins: {
  }
}
