import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import AppRouter from './Router/AppRouter';
import './style/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter /> {/* Main application routing */}
  </React.StrictMode>
);

reportWebVitals();