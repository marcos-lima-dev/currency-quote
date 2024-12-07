import axios from "axios";
import { Currency } from "../types/Currency";

const api = axios.create({
    baseURL: "https://api.exchangerate-api.com/v4",
});

const CURRENCIES = [
    { code: "USD", name: "Dólar Americano" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Libra Esterlina" },
    { code: "JPY", name: "Iene Japonês" },
    { code: "CHF", name: "Franco Suíço" },
    { code: "AUD", name: "Dólar Australiano" },
];

function calculateVariation(): number {
    return Number((Math.random() * 4 - 2).toFixed(2));
}

export async function getCurrencyRates(): Promise<Currency[]> {
    const { data } = await api.get("/latest/BRL");

    return CURRENCIES.map((currency) => ({
        ...currency,
        rate: 1 / data.rates[currency.code],
        change: calculateVariation(),
    }));
}

export const fetchHistoricalRates = async (
    currencyPair: string,
    period: string
): Promise<Array<{ timestamp: string; value: number }>> => {
    const [base, target] = currencyPair.split("-");

    try {
        const { data } = await api.get(`/latest/${base}`);
        const rate = data.rates[target];

        const points =
            period === "1d"
                ? 24
                : period === "7d"
                  ? 168
                  : period === "1m"
                    ? 720
                    : period === "6m"
                      ? 4320
                      : 8760;

        return Array.from({ length: points }, (_, i) => ({
            timestamp: new Date(
                Date.now() - (points - i) * 3600000
            ).toISOString(),
            value: rate + (Math.random() - 0.5) * (rate * 0.02),
        }));
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
