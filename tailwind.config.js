/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F5F0',
        primary: {
          DEFAULT: '#102A43',
          dark: '#0B1F33',
          light: '#243B53',
          surface: '#1B365D',
        },
        navy: {
          900: '#0B1F33',
          800: '#102A43',
          700: '#1B365D',
          600: '#243B53',
          500: '#334E68',
        },
        gold: {
          DEFAULT: '#C49A3A',
          hover: '#B38928',
          light: '#F5EBCF',
          dark: '#916F22',
        },
        legal: {
          bg: '#F7F5F0',
          paper: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
          important: '#C49A3A',
          obligation: '#1B365D',
          review: '#BE123C',
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 42, 67, 0.05), 0 1px 2px 0 rgba(16, 42, 67, 0.03)',
        'card': '0 4px 12px -2px rgba(16, 42, 67, 0.08), 0 2px 6px -1px rgba(16, 42, 67, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(16, 42, 67, 0.12), 0 4px 10px -2px rgba(16, 42, 67, 0.06)',
        'modal': '0 20px 40px -6px rgba(11, 31, 51, 0.25)',
      },
    },
  },
  plugins: [],
}
