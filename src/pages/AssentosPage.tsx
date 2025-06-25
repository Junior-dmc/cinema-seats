import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Seat } from "../components/Seat";
import { Legend } from "../components/Legend";
import { useNotification } from "../contexts/NotificationContext";
import { movieSessions, currentMovies } from "../data/movies";
import { PaymentModal } from "../components/Payment/PaymentModal";

// Configuração do layout
const SEATS_BEFORE_AISLE = 14; // Assentos antes do corredor
const SEATS_AFTER_AISLE = 14; // Assentos depois do corredor
const AISLE_SIZE = 5; // Tamanho do corredor (em número de assentos)
const ROWS_VIP = 4;  // Fileiras VIP (verde) - O até R
const ROWS_REGULAR = 11;  // Fileiras regulares (vermelho) - N até D
const ROWS_PREMIUM = 2;  // Fileiras premium (laranja) - A e B

type SeatStatus = "available" | "occupied" | "selected" | "vip" | "premium";

export interface SeatInfo {
  id: string;
  status: SeatStatus;
  section: "left" | "main" | "right" | null;
}

const createInitialSeats = (): SeatInfo[] => {
  const initialSeats: SeatInfo[] = [];
  const allRows = ROWS_VIP + ROWS_REGULAR + ROWS_PREMIUM;
  
  // Função para obter a letra da fileira (R até A)
  const getRowLetter = (index: number) => {
    return String.fromCharCode(82 - index); // Começa em 'R' (82) e vai diminuindo
  };

  // Função para criar um assento
  const createSeat = (rowLetter: string, seatNumber: number, status: SeatStatus): SeatInfo => {
    return {
      id: `${rowLetter}${seatNumber.toString().padStart(2, '0')}`,
      status,
      section: seatNumber <= SEATS_BEFORE_AISLE ? "left" : 
               seatNumber > SEATS_BEFORE_AISLE + AISLE_SIZE ? "right" : "main"
    };
  };

  // Adiciona todas as fileiras
  for (let i = 0; i < allRows; i++) {
    const rowLetter = getRowLetter(i);
    const isVipRow = i < ROWS_VIP;
    const isPremiumRow = i >= (ROWS_VIP + ROWS_REGULAR);
    const defaultStatus = isVipRow ? "vip" : isPremiumRow ? "premium" : "available";

    // Adiciona assentos antes do corredor
    for (let j = 1; j <= SEATS_BEFORE_AISLE; j++) {
      initialSeats.push(createSeat(rowLetter, j, defaultStatus));
    }

    // Adiciona espaço do corredor (sem assentos)
    for (let j = 1; j <= AISLE_SIZE; j++) {
      const seatNumber = SEATS_BEFORE_AISLE + j;
      initialSeats.push({
        id: `${rowLetter}${seatNumber.toString().padStart(2, '0')}`,
        status: "available",
        section: "main"
      });
    }

    // Adiciona assentos depois do corredor
    for (let j = 1; j <= SEATS_AFTER_AISLE; j++) {
      const seatNumber = SEATS_BEFORE_AISLE + AISLE_SIZE + j;
      initialSeats.push(createSeat(rowLetter, seatNumber, defaultStatus));
    }
  }

  // Simula alguns assentos ocupados aleatoriamente
  const occupiedCount = Math.floor(Math.random() * 20) + 10; // Entre 10 e 30 assentos ocupados
  const availableSeats = initialSeats.filter(seat => 
    seat.status !== "vip" && 
    seat.status !== "premium" && 
    seat.section !== "main" // Não ocupa assentos do corredor
  );
  
  for (let i = 0; i < occupiedCount; i++) {
    const randomIndex = Math.floor(Math.random() * availableSeats.length);
    const randomSeat = availableSeats[randomIndex];
    if (randomSeat) {
      const seatIndex = initialSeats.findIndex(s => s.id === randomSeat.id);
      if (seatIndex !== -1) {
        initialSeats[seatIndex].status = "occupied";
      }
    }
    availableSeats.splice(randomIndex, 1);
  }

  return initialSeats;
};

const AssentosPage: React.FC = () => {
  const { filmeId, sessaoId } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [seats, setSeats] = useState<SeatInfo[]>(createInitialSeats);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Buscar informações da sessão e do filme
  const movieId = Number(filmeId);
  const sessionId = Number(sessaoId);
  const sessions = movieSessions[movieId] || [];
  const currentSession = sessions.find(s => s.id === sessionId);
  const movie = currentMovies.find(m => m.id === movieId);

  if (!currentSession || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Sessão não encontrada</h1>
          <Button onClick={() => navigate('/')}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  const selectedSeats = seats.filter((seat) => seat.status === "selected");
  const totalPrice = selectedSeats.length * currentSession.price;

  const handleSeatClick = (seatId: string) => {
    setSeats((prevSeats) => {
      const targetSeat = prevSeats.find((seat) => seat.id === seatId);
      if (!targetSeat || targetSeat.status === "occupied") {
        showNotification('error', 'Este assento não está disponível.');
        return prevSeats;
      }

      const isSelected = targetSeat.status === "selected";
      const originalStatus = isSelected ? 
        (targetSeat.id[0] >= 'O' ? "vip" : 
         targetSeat.id[0] <= 'B' ? "premium" : "available") : "selected";

      if (!isSelected && selectedSeats.length >= 6) {
        showNotification('error', 'Você pode selecionar no máximo 6 assentos por vez.');
        return prevSeats;
      }

      if (!isSelected) {
        showNotification('success', `Assento ${seatId} selecionado.`);
      }

      return prevSeats.map((seat) => {
        if (seat.id === seatId) {
          return { ...seat, status: originalStatus };
        }
        return seat;
      });
    });
  };
  
  const handleConfirmSelection = () => {
    if (selectedSeats.length === 0) {
      showNotification('error', 'Por favor, selecione pelo menos um assento.');
      return;
    }
    
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-start p-4 md:p-8">
      <div className="w-full max-w-[1200px]">
        {/* Informações da Sessão */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{currentSession.title}</h1>
          <div className="flex justify-center gap-4 text-gray-300">
            <span>{currentSession.date}</span>
            <span>{currentSession.time}</span>
            <span>{currentSession.room}</span>
            <span>{currentSession.type}</span>
            <span>R$ {currentSession.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Tela */}
        <div className="w-full bg-gray-700 h-4 mb-12 rounded-lg text-center text-sm text-gray-400">
          TELA
        </div>

        {/* Layout dos Assentos */}
        <div className="flex flex-col items-center gap-2">
          {/* Números dos Assentos */}
          <div className="flex gap-4 mb-4">
            {/* Números antes do corredor */}
            <div className="flex space-x-[14px]">
              {Array.from({ length: SEATS_BEFORE_AISLE }, (_, i) => (
                <div key={i} className="w-5 text-center text-xs">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
              ))}
            </div>

            {/* Espaço do corredor */}
            <div className="w-[100px]" /> {/* Ajuste o valor conforme necessário */}

            {/* Números depois do corredor */}
            <div className="flex space-x-[14px]">
              {Array.from({ length: SEATS_AFTER_AISLE }, (_, i) => (
                <div key={i} className="w-5 text-center text-xs">
                  {(i + SEATS_BEFORE_AISLE + AISLE_SIZE + 1).toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>

          {/* Grid de Assentos */}
          <div className="grid grid-cols-1 gap-2">
            {Array.from({ length: ROWS_VIP + ROWS_REGULAR + ROWS_PREMIUM }).map((_, rowIndex) => {
              const rowLetter = String.fromCharCode(82 - rowIndex);
              const rowSeats = seats.filter(seat => seat.id.startsWith(rowLetter));
              
              return (
                <div key={rowLetter} className="flex items-center gap-4">
                  {/* Letra da fileira */}
                  <div className="w-6 text-center">{rowLetter}</div>
                  
                  {/* Assentos antes do corredor */}
                  <div className="flex gap-2">
                    {rowSeats
                      .filter(seat => Number(seat.id.slice(1)) <= SEATS_BEFORE_AISLE)
                      .map(seat => (
                        <Seat key={seat.id} seatInfo={seat} onSeatClick={handleSeatClick} />
                      ))}
                  </div>

                  {/* Corredor */}
                  <div className="w-[100px] text-center text-xs text-gray-500">
                    Corredor
                  </div>

                  {/* Assentos depois do corredor */}
                  <div className="flex gap-2">
                    {rowSeats
                      .filter(seat => Number(seat.id.slice(1)) > SEATS_BEFORE_AISLE + AISLE_SIZE)
                      .map(seat => (
                        <Seat key={seat.id} seatInfo={seat} onSeatClick={handleSeatClick} />
                      ))}
                  </div>

                  {/* Letra da fileira (direita) */}
                  <div className="w-6 text-center">{rowLetter}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legenda */}
        <Legend />

        {/* Informações da Seleção */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">Assentos selecionados: {selectedSeats.map(s => s.id).join(', ')}</p>
              <p className="text-xl font-bold mt-2">Total: R$ {totalPrice.toFixed(2)}</p>
            </div>
            <Button
              onClick={handleConfirmSelection}
              disabled={selectedSeats.length === 0}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Continuar para Pagamento
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Pagamento */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        movie={movie}
        selectedSeats={selectedSeats.map(s => s.id)}
        sessionTime={`${currentSession.date} - ${currentSession.time}`}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default AssentosPage; 