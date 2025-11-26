import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyles from './globalStyles'; // new

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles /> {/* inject global styles */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
