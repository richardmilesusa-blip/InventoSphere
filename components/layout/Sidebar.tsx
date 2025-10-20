import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../ui/Icons';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { name: 'Dashboard', path: '/', icon: 'dashboard' },
  { name: 'Products', path: '/products', icon: 'products' },
  { name: 'Categories', path: '/categories', icon: 'categories' },
  { name: 'Suppliers', path: '/suppliers', icon: 'suppliers' },
  { name: 'Settings', path: '/settings', icon: 'settings' },
];

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
  return (
    <aside className="h-screen w-64 p-4 flex flex-col fixed">
      <div className="flex-grow bg-black/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col">
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                InventoSphere
            </h1>
        </div>
        <nav className="flex-grow px-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors duration-200
                    text-gray-300 hover:bg-black/20
                    ${isActive ? 'bg-primary/20 text-white font-semibold' : ''}
                  `}
                >
                  <Icon name={item.icon} className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
            <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200"
            >
                <Icon name="logout" className="w-5 h-5" />
                <span>Logout</span>
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
