import React, { useState } from 'react';
import { currentMovies, upcomingMovies } from '../../data/movies';
import { Movie, UpcomingMovie } from '../../types';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatBotProps {
  embedded?: boolean;
}

export const ChatBot: React.FC<ChatBotProps> = ({ embedded = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Olá! Eu sou a Noelle, sua assistente de cinema. Como posso ajudar você hoje?",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const formatDate = (date: string | undefined): string => {
    if (!date) return '📽 Em cartaz agora!';
    try {
      return new Date(date).toLocaleDateString('pt-BR');
    } catch {
      return '📽 Em cartaz agora!';
    }
  };

  const checkIntent = (message: string, keywords: string[]): boolean => {
    const messageLower = message.toLowerCase();
    return keywords.some(keyword => messageLower.includes(keyword));
  };

  const generateResponse = (message: string): string => {
    const messageLower = message.toLowerCase();

    // Saudações
    if (checkIntent(messageLower, ['oi', 'olá', 'hey', 'boa', 'bom'])) {
      return "Olá! Como posso ajudar você hoje? Posso te dar informações sobre filmes em cartaz, próximas estreias, horários, preços ou fazer recomendações!";
    }

    // Despedidas
    if (checkIntent(messageLower, ['tchau', 'até', 'adeus', 'obrigado', 'obrigada'])) {
      return "Até mais! Foi um prazer ajudar. Volte sempre ao nosso cinema! 🎬";
    }

    // Preços
    if (checkIntent(messageLower, ['preço', 'valor', 'custo', 'ingresso'])) {
      return 'Os preços dos ingressos variam:\n' +
             '- Segunda a quinta: R$ 32,00\n' +
             '- Sexta a domingo: R$ 38,00\n' +
             '- Meia-entrada disponível mediante apresentação de documento\n' +
             '- Promoção às quartas-feiras: todos pagam meia!';
    }

    // Horários
    if (checkIntent(messageLower, ['horário', 'hora', 'sessão', 'começa'])) {
      return 'Temos várias sessões durante o dia:\n' +
             '- Matinê: 14h00 e 16h30\n' +
             '- Noite: 19h00 e 21h30\n' +
             'Horários podem variar conforme o filme. Quer saber de algum filme específico?';
    }

    // Idioma
    if (checkIntent(messageLower, ['legenda', 'dublado', 'idioma', 'áudio'])) {
      return 'Oferecemos sessões dubladas e legendadas:\n' +
             '- Sessões dubladas: 14h00 e 19h00\n' +
             '- Sessões legendadas: 16h30 e 21h30\n' +
             'Alguns filmes têm audiodescrição disponível!';
    }

    // Alimentação
    if (checkIntent(messageLower, ['pipoca', 'comida', 'bebida', 'lanche'])) {
      return 'Sim! Temos uma bomboniere completa:\n' +
             '- Pipocas (doce e salgada)\n' +
             '- Refrigerantes e sucos\n' +
             '- Chocolates e doces\n' +
             '- Combos com desconto!';
    }

    // Procura por filmes específicos
    for (const movie of [...currentMovies, ...upcomingMovies]) {
      if (messageLower.includes(movie.title.toLowerCase())) {
        const isUpcoming = upcomingMovies.some(m => m.id === movie.id);
        const dateInfo = isUpcoming 
          ? `📅 Estreia: ${formatDate(movie.releaseDate)}`
          : '📅 Em cartaz agora!';

        return `Encontrei informações sobre "${movie.title}":\n\n` +
               `🎬 Duração: ${movie.duration} minutos\n` +
               `🔞 Classificação: ${movie.ageRating} anos\n` +
               `🎭 Gêneros: ${movie.genres.join(', ')}\n` +
               `${dateInfo}\n\n` +
               `📝 ${movie.description}`;
      }
    }

    // Filmes em cartaz
    if (messageLower.includes('em cartaz')) {
      return `Aqui estão os filmes em cartaz:\n\n${currentMovies.map(movie => 
        `🎬 ${movie.title}\n   Duração: ${movie.duration}min | Classificação: ${movie.ageRating} anos`).join('\n\n')}`;
    }

    // Próximas estreias
    if (messageLower.includes('estreia') || messageLower.includes('próximo')) {
      return `Aqui estão as próximas estreias:\n\n${upcomingMovies.map(movie => 
        `🎬 ${movie.title}\n   Estreia: ${formatDate(movie.releaseDate)}`).join('\n\n')}`;
    }

    // Recomendações
    if (messageLower.includes('recomend') || messageLower.includes('sugest')) {
      const randomMovie = currentMovies[Math.floor(Math.random() * currentMovies.length)];
      return `Que tal assistir "${randomMovie.title}"?\n\n` +
             `🎭 Gêneros: ${randomMovie.genres.join(', ')}\n` +
             `📝 ${randomMovie.description}`;
    }

    // Resposta padrão
    return "Desculpe, não entendi completamente. Você pode:\n" +
           "- Perguntar sobre um filme específico\n" +
           "- Ver o que está em cartaz\n" +
           "- Conferir as próximas estreias\n" +
           "- Pedir uma recomendação\n" +
           "- Perguntar sobre preços, horários e serviços\n" +
           "Como posso ajudar?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...messages,
      { text: inputMessage, sender: 'user' as const },
      { text: generateResponse(inputMessage), sender: 'bot' as const }
    ];

    setMessages(newMessages);
    setInputMessage('');
  };

  return (
    <div className={`flex flex-col ${embedded ? 'h-full' : 'h-[600px]'} bg-gray-800 rounded-lg shadow-xl`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}; 