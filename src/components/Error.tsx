import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface ErrorProps {
  message?: string;
  showHomeButton?: boolean;
}

export const Error = ({ 
  message = 'Ops! Algo deu errado.', 
  showHomeButton = true 
}: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="text-6xl mb-6">😕</div>
      <h2 className="text-2xl font-bold mb-4">{message}</h2>
      <p className="text-gray-300 mb-8">
        Desculpe pelo inconveniente. Por favor, tente novamente mais tarde.
      </p>
      {showHomeButton && (
        <Link to="/">
          <Button variant="outline">Voltar para Home</Button>
        </Link>
      )}
    </div>
  );
}; 