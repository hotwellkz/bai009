import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const routes: Record<string, string> = {
  program: 'Программа курса',
  privacy: 'Политика конфиденциальности',
  terms: 'Публичная оферта'
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  return (
    <div className="bg-gray-900/50">
      <div className="container mx-auto px-4">
        <nav className="py-4 flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            Главная
          </Link>
          <ChevronRight size={16} className="text-gray-600" />
          <span className="text-white">
            {routes[pathnames[0]]}
          </span>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;