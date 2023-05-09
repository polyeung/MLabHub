import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { NotifProvider } from './context';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <NotifProvider> 
          <App />
        </NotifProvider > 
      </BrowserRouter>
      </React.StrictMode>
);
