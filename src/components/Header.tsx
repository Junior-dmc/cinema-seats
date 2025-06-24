import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold hover:text-primary transition-colors">
          🎬 CinemaSeats
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Em Cartaz
              </Link>
            </li>
            <li>
              <Link to="/proximas-estreias" className="hover:text-primary transition-colors">
                Próximas Estreias
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="hover:text-primary transition-colors">
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 