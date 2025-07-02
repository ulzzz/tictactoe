// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'scale-in': 'scaleIn 0.3s ease-in-out forwards',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        }
      }
    }
  }
}