
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';
import AppRoutes from './router';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InventoryProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </InventoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
