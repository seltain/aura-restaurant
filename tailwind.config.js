/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '430px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ground: '#120E0B',
        surface: '#1E1712',
        surfaceLight: '#2A2119',
        ivory: '#F4EDE2',
        ivoryDim: '#C9BFAE',
        amber: '#C89B5A',
        amberSoft: '#E0BC85',
        wine: '#6E2B2B',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Golos Text"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        lg: '4px',
      },
      maxWidth: {
        content: '1440px',
      },
      transitionTimingFunction: {
        candle: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
