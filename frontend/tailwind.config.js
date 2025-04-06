/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        green: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
        },
        red: {
          50: '#FEF2F2',
          400: '#F87171',
          700: '#B91C1C',
        },
      },
    },
  },
  plugins: [],
}

