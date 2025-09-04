import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from './componentes/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CartProvider>
    <App />
        <ToastContainer position="top-right" autoClose={3000} />
        </CartProvider>
  </StrictMode>,
)
