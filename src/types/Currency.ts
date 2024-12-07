// src/types/Currency.ts
export interface Currency {
    code: string;
    name: string;
    rate: number;
    change: number; // Adicionando o campo change que estava faltando
}

export interface HistoricalRate {
    timestamp: string;
    value: number;
}
