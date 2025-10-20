import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen text-gray-200 font-sans">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Topbar />
        <div className="p-4 pt-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
