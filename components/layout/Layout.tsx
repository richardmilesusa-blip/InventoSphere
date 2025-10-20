import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen text-gray-200 font-sans relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="flex-1 md:ml-64">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="p-4 pt-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
