// theme.js (or theme.ts)

import { type ThemeConfig, extendTheme } from "@chakra-ui/react";
//import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const config: ThemeConfig = {
  // colorMode
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  spacing: 4,
  fonts: {},
  config,

  components: {
    // Button: {
    //   baseStyle: {
    //     fontWeight: 'bold',
    //   },
    //   sizes: {
    //     xl: {
    //       h: '56px',
    //       fontSize: 'lg',
    //       px: '32px',
    //     },
    //   },
    //   variants: {
    //     'with-shadow': {
    //       bg: 'red.400',
    //       boxShadow: '0 0 2px 2px #efdfde',
    //     },
    //     // 4. We can override existing variants
    //     solid: (props: StyleFunctionProps) => ({
    //       bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
    //     }),
    //     // 5. We can add responsive variants
    //     sm: {
    //       bg: 'teal.500',
    //       fontSize: 'md',
    //     },
    //     defaultProps: {
    //       size: 'lg', // default is md
    //       variant: 'sm', // default is solid
    //       colorScheme: 'green', // default is gray
    //     },
    //   }
    // }
  },

  colors: {
    //#269ADC
    prime: {
      50: "#cffafe",
      100: "#cffafe",
      200: "#06b6d4",
      300: "#0891b2",
      400: "#0891b2",
      500: "#0891b2",
      600: "#0e7490",
      700: "#155e75",
      800: '#164e63',
      900: '#164e63',
      950: '#164e63',
    },

    second: {
      '50': '#fefce8',
      '100': '#fef9c3',
      '200': '#fde68a',
      '300': '#fde047',
      '400': '#facc15',
      '500': '#eab308',
      '600': '#ca8a04',
      '700': '#a16207',
      '800': '#854d0e',
      '900': '#713f12',
      '950': '#422006',
    },

    other: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
      950: '#022c22',
    },

    'shade': {
      '50': '#f8fafc',
      '100': '#f1f5f9',
      '200': '#e2e8f0',
      '300': '#cbd5e1',
      '400': '#94a3b8',
      '500': '#64748b',
      '600': '#475569',
      '700': '#334155',
      '800': '#1e293b',
      '900': '#0f172a',
      '950': '#020617',
    },

    //====================colors:
    /*
    400: #2477F4
    300: #66A0F7
    200: #A7C9FB
    100: #D3E4FD
    50: #EAf2FE

    white: #FFFFFF
    */ 
    m_prime: {
      50: '#EAF2FE',
      100: '#EAF2FE',
      200: '#D3E4FD',
      300: '#A7C9FB',
      400: '#66A0F7',
      500: '#2477F4',
      600: '#005ED6',
      700: '#0046B9',
      800: '#00309C',
      900: '#001D80',
    },

    /*
    black: #000000
    500: #191919
    400: #4D4D4D
    300: #999999
    200: #CCCCCC
    100: #E6E6E6
    50: #F5F5F5

    */
    m_gray: {
      100: '#F5F5F5',
      200: '#F5F5F5',
      300: '#F5F5F5',
      400: '#F5F5F5',
      500: '#F5F5F5',
      600: '#E6E6E6',
      700: '#CCCCCC',
      800: '#999999',
      900: '#4D4D4D',
    },
    
    /*
    sec-green: #0CC286
    sec-green-50: #E3F5EF
    sec-red: #F32424
    sec-red-50: #F9E5E5
    sec-yellow: #FFC700
    sec-yellow-50: #FAF5E1

    */ 
  },
});

export default theme;
