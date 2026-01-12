/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/features/**/*.{js,jsx,ts,tsx}',
    '../../apps/expo/app/**/*.{js,jsx,ts,tsx}',
    '../../apps/next/app/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  plugins: [require('tailwindcss-animate')],
  theme: {},
}
