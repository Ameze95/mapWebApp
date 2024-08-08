module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8a2be2', // Lila
        secondary: '#00ffff', // Cian
        accent: '#ffffff', // Blanco para textos e iconos
        contrast: '#ff6347', // Un color de contraste, como tomate
      },
    },
  },
  plugins: [],
}