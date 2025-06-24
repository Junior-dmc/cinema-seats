import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import type { SeatInfo } from "../pages/AssentosPage";
import { cn } from "../lib/utils";

interface SeatProps {
  seatInfo: SeatInfo;
  onSeatClick: (seatId: string) => void;
}

const getColorClasses = (status: SeatInfo["status"]) => {
  const baseClasses = "rounded-lg shadow-md";
  
  switch (status) {
    case "vip":
      return {
        base: cn(baseClasses, "bg-green-500"),
        light: "bg-green-400",
        dark: "bg-green-600",
        highlight: "bg-green-300"
      };
    case "premium":
      return {
        base: cn(baseClasses, "bg-orange-500"),
        light: "bg-orange-400",
        dark: "bg-orange-600",
        highlight: "bg-orange-300"
      };
    case "occupied":
      return {
        base: cn(baseClasses, "bg-gray-500"),
        light: "bg-gray-400",
        dark: "bg-gray-600",
        highlight: "bg-gray-300"
      };
    case "selected":
      return {
        base: cn(baseClasses, "bg-blue-500"),
        light: "bg-blue-400",
        dark: "bg-blue-600",
        highlight: "bg-blue-300"
      };
    default:
      return {
        base: cn(baseClasses, "bg-red-500"),
        light: "bg-red-400",
        dark: "bg-red-600",
        highlight: "bg-red-300"
      };
  }
};

export const Seat: React.FC<SeatProps> = ({ seatInfo, onSeatClick }) => {
  const colors = getColorClasses(seatInfo.status);
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
  const isDisabled = seatInfo.status === "occupied";

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