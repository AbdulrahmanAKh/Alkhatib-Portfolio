/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { bg: '#121212', card: '#1e1e1f', line: '#2e2e30', chip: '#272729', accent: '#5fcfdc', muted: '#a6a6ad' },
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'], display: ['"Playfair Display"', 'Georgia', 'serif'] },
      keyframes: { fade: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } } },
      animation: { fade: 'fade .28s ease-out' },
    },
  },
  plugins: [],
}
