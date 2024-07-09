import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import React from 'react';

import { TokenProvider } from './utils/contexts/token';
import App from './routes';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TokenProvider>
      <App />
      <Toaster position="top-center" />
    </TokenProvider>
  </React.StrictMode>
);
