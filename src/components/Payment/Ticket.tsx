import React from 'react';
import { Movie } from '../../types';
import { QRCodeSVG } from 'qrcode.react';

interface TicketProps {
  movie: Movie;
  seat: string;
  sessionTime: string;
  transactionId: string;
}

export const Ticket: React.FC<TicketProps> = ({
  movie,
  seat,
  sessionTime,
  transactionId,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm mx-auto">
      <div className="border-2 border-dashed border-gray-600 p-4 rounded-lg">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white">{movie.title}</h3>
          <p className="text-gray-400">{sessionTime}</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Assento</p>
            <p className="text-lg font-bold text-white">{seat}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Sala</p>
            <p className="text-lg font-bold text-white">Sala {movie.id}</p>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <QRCodeSVG
            value={`CINEMA-${movie.id}-${seat}-${transactionId}`}
            size={128}
            level="H"
            includeMargin={true}
            className="bg-white p-2 rounded"
          />
        </div>

        <div className="text-center text-xs text-gray-400">
          <p>ID: {transactionId}</p>
          <p className="mt-1">Este ingresso é válido apenas para a sessão especificada</p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => window.print()}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Imprimir Ingresso
          </button>
        </div>
      </div>
    </div>
  );
}; 