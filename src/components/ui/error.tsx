import React from 'react';
import { Button } from './button';

interface ErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const Error: React.FC<ErrorProps> = ({
  title = 'Ops! Algo deu errado',
  message,
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-red-500 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-300 mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry}>
          Tentar Novamente
        </Button>
      )}
    </div>
  );
}; 