import React from 'react';
import { upcomingMovies } from '../data/movies';

const ProximasEstreias: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Próximas Estreias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingMovies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={movie.imageUrl} 
              alt={movie.title} 
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-red-600 px-2 py-1 rounded text-sm">{movie.duration} min</span>
                <span className="bg-red-600 px-2 py-1 rounded text-sm">{movie.ageRating} anos</span>
                <span className="bg-green-600 px-2 py-1 rounded text-sm">Estreia: {new Date(movie.releaseDate).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span key={genre} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4">{movie.description}</p>
              <button
                onClick={() => {
                  // Implementar notificação de lembrete
                  alert('Você será notificado quando este filme estrear!');
                }}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Lembrar-me da Estreia
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProximasEstreias; 