/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          mono: ['var(--font-ibm-plex-mono)'],
          raleway: ['var(--font-raleway)'],
        },
      },
    },
    plugins: [],
  } 