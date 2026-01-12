const baseConfig = require('../../packages/ui/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    './app/**/*.{js,jsx,ts,tsx}'
  ],
  important: 'html',
}
