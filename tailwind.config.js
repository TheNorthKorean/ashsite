/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#00d9ff',
          50: '#e6fcff',
          100: '#ccf9ff',
          200: '#99f3ff',
          300: '#66edff',
          400: '#33e7ff',
          500: '#00d9ff',
          600: '#00aecc',
          700: '#008299',
          800: '#005766',
          900: '#002b33',
        },
        secondary: {
          DEFAULT: '#ff41fd',
          50: '#ffe6ff',
          100: '#ffccff',
          200: '#ff99ff',
          300: '#ff66ff',
          400: '#ff33ff',
          500: '#ff41fd',
          600: '#cc34ca',
          700: '#992798',
          800: '#661a65',
          900: '#330d33',
        },
      },
      animation: {
        'slide': 'slide 20s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-secondary': '0 0 20px rgba(255, 65, 253, 0.3)',
        'neomorphic': '20px 20px 40px rgba(0, 0, 0, 0.3), -20px -20px 40px rgba(255, 255, 255, 0.05)',
        'neomorphic-inset': 'inset 10px 10px 20px rgba(0, 0, 0, 0.3), inset -10px -10px 20px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};