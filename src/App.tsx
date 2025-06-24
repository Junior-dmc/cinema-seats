import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Seat } from "./components/Seat";
import { Legend } from "./components/Legend";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sessoes from './pages/Sessoes';
import AssentosPage from './pages/AssentosPage';
import ProximasEstreias from './pages/ProximasEstreias';
import Sobre from './pages/Sobre';
import Header from './components/Header';
import Footer from './components/Footer';
import { NotificationProvider } from './contexts/NotificationContext';

// Configuração do layout
const SEATS_MAIN_SECTION = 25; // Assentos na seção principal
const SEATS_SIDE_SECTION = 4;  // Assentos nas seções laterais
const ROWS_VIP = 4;  // Fileiras VIP (verde) - O até R
const ROWS_REGULAR = 11;  // Fileiras regulares (vermelho) - N até D
const ROWS_PREMIUM = 2;  // Fileiras premium (laranja) - A e B

type SeatStatus = "available" | "occupied" | "selected" | "vip" | "premium";

export interface SeatInfo {
  id: string;
  status: SeatStatus;
  section: "left" | "main" | "right" | null;
}

function App() {
  const [seats, setSeats] = useState<SeatInfo[]>(() => {
    const initialSeats: SeatInfo[] = [];
    const allRows = ROWS_VIP + ROWS_REGULAR + ROWS_PREMIUM;
    
    // Função para obter a letra da fileira (R até A)
    const getRowLetter = (index: number) => {
      return String.fromCharCode(82 - index); // Começa em 'R' (82) e vai diminuindo
    };

    // Adiciona assentos VIP (verdes)
    for (let i = 0; i < ROWS_VIP; i++) {
      const rowLetter = getRowLetter(i);
      for (let j = 1; j <= SEATS_MAIN_SECTION; j++) {
        initialSeats.push({ 
          id: `${rowLetter}${j.toString().padStart(2, '0')}`, 
          status: "vip",
          section: "main"
        });
      }
    }

    // Adiciona assentos regulares (vermelhos)
    for (let i = ROWS_VIP; i < ROWS_VIP + ROWS_REGULAR; i++) {
      const rowLetter = getRowLetter(i);
      
      // Seção lateral esquerda
      for (let j = 1; j <= SEATS_SIDE_SECTION; j++) {
        initialSeats.push({ 
          id: `${rowLetter}${j.toString().padStart(2, '0')}`, 
          status: "available",
          section: "left"
        });
      }
      
      // Seção principal
      for (let j = 1; j <= SEATS_MAIN_SECTION; j++) {
        initialSeats.push({ 
          id: `${rowLetter}${(j + SEATS_SIDE_SECTION).toString().padStart(2, '0')}`, 
          status: "available",
          section: "main"
        });
      }
      
      // Seção lateral direita
      for (let j = 1; j <= SEATS_SIDE_SECTION; j++) {
        initialSeats.push({ 
          id: `${rowLetter}${(j + SEATS_SIDE_SECTION + SEATS_MAIN_SECTION).toString().padStart(2, '0')}`, 
          status: "available",
          section: "right"
        });
      }
    }

    // Adiciona assentos premium (laranja)
    for (let i = ROWS_VIP + ROWS_REGULAR; i < allRows; i++) {
      const rowLetter = getRowLetter(i);
      for (let j = 1; j <= SEATS_MAIN_SECTION; j++) {
        initialSeats.push({ 
          id: `${rowLetter}${j.toString().padStart(2, '0')}`, 
          status: "premium",
          section: "main"
        });
      }
    }

    return initialSeats;
  });

  const selectedSeats = seats.filter((seat) => seat.status === "selected");

  const handleSeatClick = (seatId: string) => {
    setSeats((prevSeats) => {
      const targetSeat = prevSeats.find((seat) => seat.id === seatId);
      if (!targetSeat || targetSeat.status === "occupied") {
        return prevSeats;
      }

      const isSelected = targetSeat.status === "selected";
      const originalStatus = isSelected ? 
        (targetSeat.id[0] >= 'O' ? "vip" : 
         targetSeat.id[0] <= 'B' ? "premium" : "available") : "selected";

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
      alert("Por favor, selecione pelo menos um assento.");
      return;
    }
    const selectedIds = selectedSeats.map(s => s.id).join(', ');
    alert(`Você confirmou a seleção dos assentos: ${selectedIds}`);
  }

  // Função para renderizar uma seção de assentos
  const renderSeats = (section: "left" | "main" | "right") => {
    return seats
      .filter(seat => seat.section === section)
      .map((seat) => (
        <Seat key={seat.id} seatInfo={seat} onSeatClick={handleSeatClick} />
      ));
  };

  return (
    <NotificationProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sessoes/:id" element={<Sessoes />} />
              <Route path="/assentos/:filmeId/:sessaoId" element={<AssentosPage />} />
              <Route path="/proximas-estreias" element={<ProximasEstreias />} />
              <Route path="/sobre" element={<Sobre />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
