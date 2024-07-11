import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import React from 'react';

import { TokenProvider } from './utils/contexts/token';
import { ThemeProvider } from './utils/contexts/theme-provider';
import './styles/index.css';
import App from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TokenProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
        <Toaster position="top-center" />
      </ThemeProvider>
    </TokenProvider>
  </React.StrictMode>
);
