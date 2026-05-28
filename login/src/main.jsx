import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/globals.css';

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    backgroundColor: '#f3f4f6'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '3px solid #e5e7eb',
        borderTop: '3px solid #2563eb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }} />
      <p style={{ marginTop: '12px', color: '#6b7280' }}>Cargando...</p>
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
