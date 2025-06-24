import React from 'react';

interface LegendItemProps {
  color: string;
  label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-5 h-5 rounded-t-lg ${color} border-b-2 border-gray-700`} />
    <span className="text-sm">{label}</span>
  </div>
);

export const Legend: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      <LegendItem color="bg-red-500" label="Disponível" />
      <LegendItem color="bg-blue-500" label="Selecionado" />
      <LegendItem color="bg-gray-600" label="Ocupado" />
      <LegendItem color="bg-green-500" label="VIP" />
      <LegendItem color="bg-orange-500" label="Premium" />
    </div>
  );
}; 