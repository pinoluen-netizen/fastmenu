// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b72301', // Electric Orange
          container: '#ff5733',
          on: '#ffffff',
        },
        surface: {
          DEFAULT: '#f9f9f9',
          dim: '#dadada',
          container: '#eeeeee',
        },
        charcoal: '#1a1c1c',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        DEFAULT: '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'modal': '0 12px 24px rgba(0, 0, 0, 0.1)',
      }
    },
  },
}