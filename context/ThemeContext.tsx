import React, { createContext, useMemo } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo(() => ({ theme: 'dark' as const }), []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
