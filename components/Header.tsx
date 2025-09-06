
import React from 'react';
import type { View } from '../App';
import { HeartIcon, UserCircleIcon, LogoutIcon } from './icons/Icons';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const { user, logout } = useAuth();
  const navItems: { id: View; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'doctors', label: 'Find a Doctor' },
    { id: 'online-consultations', label: 'Online Consultations' },
    { id: 'symptom-checker', label: 'Symptom Checker' },
    { id: 'records', label: 'Health Records' },
    { id: 'pharmacy', label: 'Pharmacy Stock' },
  ];

  const getLinkClass = (view: View) => {
    const baseClass = 'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300';
    if (currentView === view) {
      return `${baseClass} bg-primary text-white shadow-sm`;
    }
    return `${baseClass} text-primary-dark hover:bg-primary/10`;
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setView('home')}
        >
          <HeartIcon className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary-dark">Nabha Health Connect</span>
        </div>
        
        {user && (
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={getLinkClass(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2 text-text">
                <UserCircleIcon className="h-6 w-6 text-text-light" />
                <span className="font-medium">Welcome, {user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                title="Logout"
              >
                <LogoutIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
