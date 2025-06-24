import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { currentMovies, movieSessions } from '../data/movies';

const Sessoes: React.FC = () => {
  const { id } = useParams();
  const movieId = Number(id);
  const movie = currentMovies.find(m => m.id === movieId);
  const sessions = movieSessions[movieId] || [];

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Filme não encontrado</h1>
          <Link to="/">
            <Button>Voltar para Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster e Informações */}
          <div className="md:w-1/3">
            <img 
              src={movie.imageUrl} 
              alt={movie.title} 
              className="w-full rounded-lg shadow-lg mb-4"
            />
            <div className="bg-gray-800 rounded-lg p-4">
              <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-gray-700 rounded text-sm">{movie.duration} min</span>
                <span className="px-2 py-1 bg-gray-700 rounded text-sm">{movie.ageRating} anos</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span key={genre} className="px-2 py-1 bg-primary/20 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-gray-300">{movie.description}</p>
            </div>
          </div>

          {/* Sessões */}
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6">Sessões Disponíveis</h2>
            <div className="grid gap-4">
              {sessions.map((session) => (
                <div key={session.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold mb-1">{session.time}</p>
                      <div className="flex gap-2">
                        <span className="text-sm text-gray-300">{session.room}</span>
                        <span className="text-sm text-gray-300">{session.type}</span>
                        <span className="text-sm text-gray-300">R$ {session.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <Link to={`/assentos/${movie.id}/${session.id}`}>
                      <Button>Escolher Assentos</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/">
            <Button variant="outline">Voltar para Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sessoes; 