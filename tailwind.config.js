/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Configuración de Tailwind CSS
  theme: {
    extend: {
      fontFamily: {
        'valorant': ['Teko', 'sans-serif'],
      },
      // Animaciones
      animation: {
        'fade-in-out': 'fadeInOut 3s ease-in-out',
      },
      // Clases de animación
      keyframes: {
        fadeInOut: {
          '0%': { opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}