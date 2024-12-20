import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/95 text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <Link to="/" className="text-xl font-bold text-white">
              b<span className="text-red-500">-</span>ai
            </Link>
          </div>
          
          <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
            <Link to="/program" className="hover:text-white transition-colors">
              Программа курса
            </Link>
            <Link to="/pricing" className="hover:text-white transition-colors">
              Стоимость
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Публичная оферта
            </Link>
          </nav>
        </div>
        
        <div className="mt-8 text-center text-sm">
          <p>© {currentYear} b-ai. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;