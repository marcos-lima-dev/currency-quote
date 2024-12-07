// src/components/common/CurrencyCard.tsx
import { Currency } from '../../types/Currency';

interface Props {
  moeda: Currency;
}

const CurrencyCard = ({ moeda: { code, name, rate, change } }: Props) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{code}</h3>
        <p className="text-gray-600 text-sm">{name}</p>
      </div>
      <span className="text-gray-400">{change > 0 ? '↗' : '↘'}</span>
    </div>
    <div className="mt-2">
      <p className="text-xl font-bold">R$ {rate.toFixed(2)}</p>
      <p className={`${change > 0 ? 'text-green-500' : 'text-red-500'} text-sm`}>
        {change > 0 ? '+' : ''}{change.toFixed(2)}%
      </p>
    </div>
  </div>
);

export default CurrencyCard;