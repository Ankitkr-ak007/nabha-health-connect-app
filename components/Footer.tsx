
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Nabha Health Connect. All rights reserved.</p>
        <p className="text-sm text-primary-light mt-1">
          A project by the Government of Punjab, Department of Higher Education.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
