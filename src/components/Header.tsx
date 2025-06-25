import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white py-4 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold hover:text-primary transition-colors">
          🎬 CinemaSeats
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
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
              <Link to="/noelle" className="hover:text-primary transition-colors">
                Noelle
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="hover:text-primary transition-colors">
                Sobre
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/perfil" className="hover:text-primary transition-colors">
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/historico" className="hover:text-primary transition-colors">
                    Histórico
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1"
                  >
                    Sair
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-sm px-3 py-1">
                      Entrar
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/registro">
                    <Button className="bg-gray-600 hover:bg-gray-700 text-sm px-3 py-1">
                      Registrar
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 