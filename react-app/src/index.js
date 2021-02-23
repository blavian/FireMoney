import React from 'react';
import ReactDOM from 'react-dom';
import { ModalProvider } from "./context/Modal"
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
