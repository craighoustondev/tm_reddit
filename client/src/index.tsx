import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const colors = {
  brand: {
    back: '#DCEBEE'
  },
}

const theme = extendTheme({ colors })

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App/>
    </ChakraProvider>
  </React.StrictMode>
);

