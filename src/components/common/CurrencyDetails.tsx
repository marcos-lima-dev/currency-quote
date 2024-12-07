// src/components/common/CurrencyDetails.tsx
import React from 'react';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface CurrencyDetailsProps {
  currency: {
    code: string;
    name: string;
    rate: number;
    change: number;
  };
  onClose: () => void;
}

const CurrencyDetails: React.FC<CurrencyDetailsProps> = ({ currency, onClose }) => {
  if (!currency) return null;

  const mockData = [
    { time: '09:00', value: currency.rate * 0.95 },
    { time: '10:00', value: currency.rate * 0.97 },
    { time: '11:00', value: currency.rate * 0.99 },
    { time: '12:00', value: currency.rate * 1.01 },
    { time: '13:00', value: currency.rate * 0.98 },
    { time: '14:00', value: currency.rate * 1.02 },
    { time: '15:00', value: currency.rate }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{currency.code}</h2>
            <p className="text-gray-600">{currency.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <XAxis dataKey="time" />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
              />
              <Tooltip 
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
                labelFormatter={(label) => `Horário: ${label}`}
              />
              <Line 
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600 block mb-1">Cotação Atual</span>
            <span className="text-2xl font-bold">R$ {currency.rate.toFixed(2)}</span>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600 block mb-1">Variação</span>
            <div className="flex items-center">
              {currency.change > 0 ? (
                <TrendingUp className="text-green-500 mr-1" size={20} />
              ) : (
                <TrendingDown className="text-red-500 mr-1" size={20} />
              )}
              <span className={`${currency.change > 0 ? 'text-green-500' : 'text-red-500'} font-bold text-2xl`}>
                {currency.change > 0 ? '+' : ''}{currency.change.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDetails;