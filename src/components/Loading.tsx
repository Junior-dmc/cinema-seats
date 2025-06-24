import React from 'react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-20 h-20">
        {/* Círculo externo */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        
        {/* Círculo animado */}
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        
        {/* Ícone central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🎬</span>
        </div>
      </div>
    </div>
  );
}; 