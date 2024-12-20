import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Coins, Settings, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, tokens, signOut } = useAuth();

  return (
    <header className="fixed w-full bg-black/95 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            b<span className="text-red-500">-</span>ai
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/program" className="text-gray-300 hover:text-white transition-colors">Программа</Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Стоимость</Link>            
            <Link to="/admin" className="text-gray-300 hover:text-white transition-colors hidden md:block">
              <Settings size={20} />
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                  <User size={20} />
                </Link>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Coins className="text-yellow-500" size={20} />
                  <span>{tokens}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
              >
                Войти
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/program" className="text-gray-300 hover:text-white transition-colors">Программа</Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Стоимость</Link>
              <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                <div className="flex items-center space-x-2">
                  <Settings size={20} />
                  <span>Админ панель</span>
                </div>
              </Link>
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Coins className="text-yellow-500" size={20} />
                    <span>{tokens}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Войти
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;