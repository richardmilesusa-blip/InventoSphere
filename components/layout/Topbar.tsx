import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Icon } from '../ui/Icons';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="p-4">
      <div className="bg-black/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 text-gray-300 hover:text-white">
                <Icon name="menu" className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block w-full max-w-xs">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-transparent border-none rounded-lg focus:outline-none focus:ring-0 text-gray-100 placeholder-gray-400"
              />
            </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {user?.name.charAt(0)}
            </div>
            <div className='hidden sm:block'>
                <p className="font-semibold text-gray-100 truncate">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
