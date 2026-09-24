/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0f1c', // Dark navy
        surface: '#121a2f',
        primary: '#3b82f6', // Blue
        secondary: '#1e293b',
        accent: '#06b6d4', // Cyan
        success: '#10b981', // Green
        warning: '#f59e0b', // Orange
        danger: '#ef4444', // Red
        critical: '#b91c1c', // Dark Red
        text: '#f8fafc',
        muted: '#94a3b8',
        border: '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
