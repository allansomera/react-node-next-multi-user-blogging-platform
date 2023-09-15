// tailwind.config.js
const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // content: [
  //   // ...
  //   './src/**/*.{js,ts,jsx,tsx,mdx}',
  //   // './pages/**/*.{js,ts,jsx,tsx,mdx}',
  //   './components/**/*.{js,ts,jsx,tsx,mdx}',
  //   './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  //   // './node_modules/@nextui-org/theme/dist/components/navbar.js',
  // ],
  // theme: {
  //   extend: {},
  // },
  // darkMode: 'class',
  // plugins: [nextui()],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    // './node_modules/@nextui-org/theme/dist/components/navbar.js',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  darkMode: 'class',
  plugins: [
    nextui(),
    require('tailwindcss'),
    require('precss'),
    require('autoprefixer'),
  ],
}
