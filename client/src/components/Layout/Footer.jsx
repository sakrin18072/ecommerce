import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-blue-800 text-light py-8 flex flex-col items-center">
      <p className="mb-4 text-sm text-gray-300">&copy; sakrin. All rights reserved</p>
      <div className="flex space-x-4">
        <Link className="text-sm text-gray-300 hover:text-white" to="/about">
          About
        </Link>
        <span className="text-gray-300">|</span>
        <Link className="text-sm text-gray-300 hover:text-white" to="/contact">
          Contact
        </Link>
        <span className="text-gray-300">|</span>
        <Link className="text-sm text-gray-300 hover:text-white" to="/policy">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
