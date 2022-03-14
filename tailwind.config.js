const { colors: defaultColors } = require('tailwindcss/defaultTheme');

const colors = {
  ...defaultColors,
  ...{
    default: '#121212',
    primary: '#BA3737',
    "primary-light": {
      1: '#F8EBEB',
      2: '#EECDCD',
      3: '#DD9B9B',
      4: '#CF7373',
    },
    "primary-dark": {
      1: '#952C2C',
      2: '#5D1C1C',
      3: '#381010',
      4: '#250B0B',
    },
    "dark": "#121212",
    "dark-1": "#898989",
    "dark-2": "#6E6E6E",
    "dark-3": "#525252",
    "dark-4": "#292929",
    "dark-5": "#1B1B1B",
    "bright": "#FFFFFF",
    "bright-1": "#F8F8F8",
    "bright-2": "#F3F3F3",
    "bright-3": "#E7E7E7",
    "bright-4": "#D0D0D0",
    "bright-5": "#ACACAC",
    info: {
      1: '#E6F2FF',
      2: '#80BFFF',
      3: '#007FFF',
      4: '#004C99',
      5: '#00264C',
    },
    success: {
      1: '#EAF9F0',
      2: '#97E3B3',
      3: '#2EC667',
      4: '#1C773E',
      5: '#0E3B1F',
    },
    warning: {
      1: '#FFF6E6',
      2: '#FDD080',
      3: '#FAA100',
      4: '#966100',
      5: '#4B3000',
    },
    danger: {
      1: '#FDEAEA',
      2: '#F59494',
      3: '#EA2929',
      4: '#8C1919',
      5: '#460C0C',
    },
  },
};

const fontSize = {
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  20: '20px',
  24: '24px',
  30: '30px',
  36: '36px'
};

const lineHeight = {
  18: '18px',
  21: '21px',
  24: '24px',
  27: '27px',
  28: '28px',
  36: '36px',
  44: '44px',
  50: '50px',
  'auto': 'auto'
};
const boxShadow = {
  '1p': '0px 0px 12px rgba(0, 0, 0, 0.14)',
  'rgba-01-01': '0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1)',
  'rgba-01-08': '0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.08)',
  'inner-2px-primary-light-2': `0px 0px 0px 2px ${colors["primary-light"][2]} inset`,
  'inner-2px-bright-2': `0px 0px 0px 2px ${colors["bright-2"]} inset`,
  'inner-1px-bright-2': `0px 0px 0px 1px ${colors["bright-2"]} inset`,
  'inner-1px-bright-3': `0px 0px 0px 1px ${colors["bright-3"]} inset`,
  'inner-2px-danger-2': `0px 0px 0px 2px ${colors["danger"][2]} inset`,
  'inner-2px-dark-1': `0px 0px 0px 2px ${colors["dark-1"]} inset`,
  '3px-primary-light-1': `0px 0px 0px 3px ${colors["primary-light"][1]}`,
  '3px-danger-1': `0px 0px 0px 3px ${colors["danger"][1]}`,
  '3px-bright-2': `0px 0px 0px 3px ${colors["bright-2"]}`,
  'inner-left-6px-primary': `6px 0px 0px 0px ${colors["primary"]} inset`,
  'inner-left-1px-dark-2': `1px 0px 0px 0px ${colors["dark-2"]} inset`,
  primary: `0 0 5px ${colors["primary"]};`,
};
const width = {
  fill: '-webkit-fill-available',
}
const screens = {
  'max992': {'max': '992px'},
  'min993': '993px',
}
const backgroundColor = {
  dark:"#121212"
}
const variants = ['responsive', 'focus-visible', 'focus-within', 'hover', 'focus', 'active', 'disabled'];

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Outfit', 'sans-serif']
    },
    colors,
    extend: {
      fontSize,
      lineHeight,
      boxShadow,
      width,
      screens,
      backgroundColor
    }
  },
  variants: {
    backgroundColor: variants.concat(...['group-hover']),
    borderColor: variants.concat(...['group-focus']),
    borderStyle: variants.concat(...['group-focus']),
    borderWidth: variants,
    textDecoration: variants,
    fill: variants,
    ringWidth: variants,
    ringColor: variants,
    transitionProperty: variants,
    textColor: variants.concat(...['group-hover']),
    opacity: variants,
    backgroundOpacity: variants,
    margin: ['last', 'first'],
    boxShadow: variants.concat(...['group-focus']),
    overflow: variants,
    outline: variants,
    padding: ['last', 'first'],
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
