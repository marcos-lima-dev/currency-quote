import { useEffect, useState } from "react";
import { getCurrencyRates } from "../services/api";
import { Currency } from "../types/Currency";
import HistoricalChart from "./currency/HistoricalChart";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
    const { darkMode } = useApp();
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div
                className={`rounded-lg w-full max-w-4xl relative ${
                    darkMode ? "bg-gray-800" : "bg-white"
                }`}
            >
                <button
                    onClick={onClose}
                    className={`absolute right-4 top-4 p-2 rounded-full ${
                        darkMode
                            ? "hover:bg-gray-700 text-white"
                            : "hover:bg-gray-100 text-gray-900"
                    }`}
                >
                    <X size={24} />
                </button>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

export default function CurrencyList() {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(
        null
    );
    const { darkMode, selectedCurrencies, setRates } = useApp();

    useEffect(() => {
        async function loadCurrencies() {
            try {
                const data = await getCurrencyRates();
                setCurrencies(data);

                const currentRates = data.reduce(
                    (acc, curr) => ({
                        ...acc,
                        [curr.code]: curr.rate,
                    }),
                    {}
                );
                setRates(currentRates);
            } finally {
                setLoading(false);
            }
        }

        loadCurrencies();
        const interval = setInterval(loadCurrencies, 30000);
        return () => clearInterval(interval);
    }, [setRates]);

    const filteredCurrencies = currencies.filter(
        (currency) => selectedCurrencies[currency.code]
    );

    if (loading)
        return (
            <div
                className={`flex justify-center items-center h-screen ${
                    darkMode ? "text-white" : "text-gray-900"
                }`}
            >
                Carregando...
            </div>
        );

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {filteredCurrencies.map((currency) => (
                    <div
                        key={currency.code}
                        onClick={() => setSelectedCurrency(currency.code)}
                        className={`rounded-lg shadow hover:shadow-md transition-shadow p-4 cursor-pointer
              ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold">
                                    {currency.name}
                                </h3>
                                <p className="text-3xl font-bold mt-1">
                                    R$ {currency.rate.toFixed(2)}
                                </p>
                            </div>
                            <span
                                className={`text-sm font-medium ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                            >
                                {currency.code}
                            </span>
                        </div>
                        <p
                            className={`text-sm font-medium ${
                                currency.change > 0
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {currency.change > 0 ? "+" : ""}
                            {currency.change}%
                        </p>
                    </div>
                ))}
            </div>

            {selectedCurrency && (
                <Modal onClose={() => setSelectedCurrency(null)}>
                    <div className={darkMode ? "dark" : ""}>
                        <div
                            className={`${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
                        >
                            <HistoricalChart
                                currencyPair={`${selectedCurrency}-BRL`}
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
