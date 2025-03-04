/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ed',
          100: '#dcf1d7',
          200: '#bde3b5',
          300: '#93c47d',  // Orta ton
          400: '#75b35d',  // Ana ton
          500: '#5a9645',  // Vurgu tonu
          600: '#467934',  // Hover/Active
          700: '#375d29',
          800: '#2c4a21',
          900: '#243c1b',
          950: '#0f1a0b',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
          lighter: '#3D3D3D',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
        secondary: {
          DEFAULT: '#1A1A1A', // Dark gray/black
          light: '#333333',
        },
        blue: {
          950: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
} 