
import React from 'react';
import { HeartIcon } from './icons/Icons';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center space-x-3 mb-8">
            <HeartIcon className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-primary-dark">Nabha Health Connect</span>
        </div>
        <div className="bg-card p-8 rounded-2xl shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
