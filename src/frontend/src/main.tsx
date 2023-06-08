import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { NotifProvider } from './context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


// override some toolbar styles
const theme = createTheme({
  components: {
    MuiToolbar: {
      styleOverrides: {
        dense: {
          height: 30,
          minHeight: 30
        }
      }
    }
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
        <NotifProvider> 
          <App />
        </NotifProvider > 
      </BrowserRouter>
    </ThemeProvider >
  </React.StrictMode>
);
