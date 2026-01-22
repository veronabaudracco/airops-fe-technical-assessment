/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['13px', { lineHeight: '20px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'nav': ['12px', { lineHeight: '20px' }],
        'title': ['30px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        // System colors
        'system-black': '#09090B',
        'system-black-8': 'rgba(9, 9, 11, 0.08)',
        'system-black-4': 'rgba(9, 9, 11, 0.04)',
        'system-white': '#FFFFFF',
        'system-grey-500': '#808593',
        'system-grey-400': '#868686',
        
        // Brand colors
        'brand-purple': '#8B87FF',
        'brand-blue': '#00A3FF',
        
        // Text colors
        'text-primary': '#09090B',
        'text-secondary': '#565656',
        'text-grey': '#808593',
        'text-grey-light': '#868686',
        'text-muted': '#A1A1A1',
        
        // Border colors
        'border-primary': '#ECEDEF',
        'border-secondary': '#E6E6E6',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'xs': '0px 1px 2px rgba(16, 24, 40, 0.05)',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-out-to-left": "slide-out-to-left 0.3s ease-out",
      },
    },
  },
  plugins: [],
}
