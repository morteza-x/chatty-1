import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
//import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
//import theme from './libs/chakraTheme.ts'
//@ts-ignore
import * as e from '@/configs/config.ts'
//@ts-ignore
import i18n from './libs/i18n.ts'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from "./libs/chakraTheme"
import { BaseModalProvider } from './providers/BaseModalProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript 
        initialColorMode={theme.config.initialColorMode}
        />
          <BaseModalProvider>
          <App />      
          </BaseModalProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
