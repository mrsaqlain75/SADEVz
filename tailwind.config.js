export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#e6f9ff',
        darkbg: '#2f2d25',
        bluebg: '#061018',
        light: '#efefef',
        bright: '#00bcd4',
        learncolor: '#c8c8c8',
        createcolor: '#6c6c6c',
        greybg: '#1a1a1a'
      },

      fontFamily: {
        mono: ['"Manrope"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },

      animation: {
        fadeInUp: 'fadeInUp 0.8s ease forwards',
      }
    },
  },

  plugins: [],
};