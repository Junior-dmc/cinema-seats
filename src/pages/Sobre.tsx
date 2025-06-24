import React from 'react';

const Sobre: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre o CinemaSeats</h1>
        
        <div className="space-y-8">
          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
            <p className="text-gray-300">
              O CinemaSeats nasceu da paixão pelo cinema e da vontade de tornar a experiência de ir ao cinema ainda mais especial. 
              Nossa plataforma foi desenvolvida pensando em proporcionar praticidade e conforto na hora de escolher seus assentos 
              para as melhores estreias do cinema.
            </p>
          </section>

          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
            <p className="text-gray-300">
              Facilitar e aprimorar a experiência de compra de ingressos de cinema, oferecendo uma plataforma intuitiva e 
              moderna para a escolha de assentos. Queremos que cada ida ao cinema seja memorável, começando pela facilidade 
              na hora de reservar seu lugar.
            </p>
          </section>

          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Recursos</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Visualização intuitiva do mapa de assentos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Diferentes categorias de assentos (VIP, Premium, Regular)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Informações detalhadas sobre filmes e sessões</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Sistema de notificação para próximas estreias</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Interface moderna e responsiva</span>
              </li>
            </ul>
          </section>

          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Tecnologias Utilizadas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg">
                <span className="text-4xl mb-2">⚛️</span>
                <span className="text-sm">React</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg">
                <span className="text-4xl mb-2">🎨</span>
                <span className="text-sm">Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg">
                <span className="text-4xl mb-2">📱</span>
                <span className="text-sm">Design Responsivo</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg">
                <span className="text-4xl mb-2">🔒</span>
                <span className="text-sm">Segurança</span>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Entre em Contato</h2>
            <p className="text-gray-300 mb-4">
              Tem alguma dúvida, sugestão ou feedback? Ficaremos felizes em ouvir você!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-4 bg-gray-700 rounded-lg">
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-gray-300">contato@cinemaseats.com</p>
              </div>
              <div className="flex-1 p-4 bg-gray-700 rounded-lg">
                <h3 className="font-bold mb-2">Telefone</h3>
                <p className="text-gray-300">(11) 99999-9999</p>
              </div>
              <div className="flex-1 p-4 bg-gray-700 rounded-lg">
                <h3 className="font-bold mb-2">Horário</h3>
                <p className="text-gray-300">Seg-Sex: 9h às 18h</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sobre; 