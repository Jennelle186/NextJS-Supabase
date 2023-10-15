import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    }, 
    colors: {
      'blue': '#1fb6ff',     // Represents clean water
      'green': '#13ce66',    // Represents freshness and nature
      'gray-dark': '#273444', // Neutral color for balance
      'gray': '#8492a6',      // Lighter gray for a clean look
      'gray-light': '#d3dce6', // Very light gray for a sense of purity
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },      borderRadius: {
        '4xl': '2rem',
      },
    }
  },
  plugins: [],
}
export default config
