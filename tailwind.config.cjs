/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'obsidian': '#05010d',
        'primary-pink': '#ff007f',
        'primary-lime': '#39ff14',
        'primary-purple': '#9d00ff',
        'primary-orange': '#ff5e00',
      },
      fontFamily: {
        heading: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        marquee: 'marquee 18s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(157,0,255,0.10)',
      },
    },
  },
  plugins: [],
}
