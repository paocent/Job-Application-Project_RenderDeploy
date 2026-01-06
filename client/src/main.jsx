import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './src-CSS/general.css';
import App from './App.jsx'
import ThemeContextProvider from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </ThemeContextProvider>
)
