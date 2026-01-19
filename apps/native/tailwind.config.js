const { hairlineWidth } = require('nativewind/theme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    './../../packages/features/src/**/*.{js,ts,jsx,tsx,mdx}',
    './../../packages/core/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [require('nativewind/preset'), require('@my/config/tailwind-preset')],
}
