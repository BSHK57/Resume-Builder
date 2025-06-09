/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'text-blue-600',
    'text-blue-800',
    'text-green-600',
    'text-green-800',
    'text-purple-600',
    'text-purple-800',
    'text-orange-600',
    'text-orange-800',
    'text-yellow-600',
    'text-yellow-800',
    'bg-blue-100',
    'bg-green-100',
    'bg-purple-100',
    'bg-orange-100',
    'bg-yellow-100',
    'border-blue-200',
    'border-green-200',
    'border-purple-200',
    'border-orange-200',
    'border-yellow-200',
  ],
}