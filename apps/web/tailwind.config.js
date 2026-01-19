const { hairlineWidth } = require('nativewind/theme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './../../packages/features/**/*.{js,ts,jsx,tsx,mdx}',
    './../../packages/core/src/**/*.{js,ts,jsx,tsx,mdx}',
    './../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [require('nativewind/preset'),require('@my/config/tailwind-preset')],
  important: 'html body',
  darkMode: 'class',
}
