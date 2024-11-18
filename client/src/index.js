import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import AppRouter from './Router/AppRouter';
import { AuthProvider } from './Context/AuthContext';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <AuthProvider>
      <AppRouter /> {/* Main application routing */}
    </AuthProvider>
    
  </React.StrictMode>
);

reportWebVitals();