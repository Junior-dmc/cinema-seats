import React from 'react';
import { ChatBot } from '../components/Noelle/ChatBot';

const NoelleSugst: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Noelle - Sua Assistente de Cinema</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Olá! Eu sou a Noelle, sua assistente virtual especializada em filmes. 
          Posso te ajudar com recomendações, informações sobre filmes em cartaz, 
          próximas estreias e muito mais!
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Como posso ajudar?</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• Recomendar filmes baseado nos seus gostos</li>
              <li>• Informar sobre filmes em cartaz</li>
              <li>• Mostrar próximas estreias</li>
              <li>• Buscar filmes por gênero</li>
              <li>• Dar informações sobre sessões</li>
            </ul>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Experimente perguntar:</h2>
            <ul className="space-y-2 text-gray-300">
              <li>"Me recomenda um filme de ação"</li>
              <li>"Quais filmes estão em cartaz?"</li>
              <li>"Quando estreia Duna 2?"</li>
              <li>"Me mostra os filmes de drama"</li>
              <li>"Quero ver as próximas estreias"</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <div className="bg-purple-600 p-4 flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 font-bold text-xl">N</span>
            </div>
            <h2 className="text-xl font-bold text-white">Chat com a Noelle</h2>
          </div>
          <ChatBot embedded={true} />
        </div>
      </div>
    </div>
  );
};

export default NoelleSugst; 