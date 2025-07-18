import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import type { SeatInfo } from "../pages/AssentosPage";

interface SeatProps {
  seatInfo: SeatInfo;
  onSeatClick: (seatId: string) => void;
}

export const Seat: React.FC<SeatProps> = ({ seatInfo, onSeatClick }) => {
  const getStatusText = () => {
    switch (seatInfo.status) {
      case 'available':
        return 'Disponível';
      case 'occupied':
        return 'Ocupado';
      case 'selected':
        return 'Selecionado';
      case 'vip':
        return 'VIP';
      case 'premium':
        return 'Premium';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (seatInfo.status) {
      case 'available':
        return 'bg-red-500 hover:bg-red-600';
      case 'occupied':
        return 'bg-gray-600 cursor-not-allowed';
      case 'selected':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'vip':
        return 'bg-green-500 hover:bg-green-600';
      case 'premium':
        return 'bg-orange-500 hover:bg-orange-600';
      default:
        return 'bg-gray-500';
    }
  };

  const isClickable = seatInfo.status !== 'occupied' && seatInfo.section !== 'main';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`
              w-5 h-5 rounded-t-lg
              ${getStatusColor()}
              ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
              transition-colors duration-200
              text-[8px] text-white font-bold
              flex items-center justify-center
              border-b-2 border-gray-700
            `}
            onClick={() => isClickable && onSeatClick(seatInfo.id)}
            disabled={!isClickable}
          >
            {seatInfo.id}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Assento {seatInfo.id} - {getStatusText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}; 