import { FC, useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import CurrencyDetails from "../components/common/CurrencyDetails";

const LOCAL_STORAGE_KEY = "currency_data";

interface Currency {
    code: string;
    name: string;
    rate: number;
    change: number;
}

const initialCurrencies: Currency[] = [
    { code: "USD", name: "Dólar Americano", rate: 6.06, change: 1.01 },
    { code: "EUR", name: "Euro", rate: 6.37, change: 1.57 },
    { code: "GBP", name: "Libra Esterlina", rate: 7.69, change: -0.34 },
    { code: "JPY", name: "Iene Japonês", rate: 0.04, change: 1.39 },
    { code: "CHF", name: "Franco Suíço", rate: 6.85, change: -1.64 },
    { code: "AUD", name: "Dólar Australiano", rate: 3.88, change: 1.74 },
];

const Home: FC = () => {
    const [currencies, setCurrencies] = useState<Currency[]>(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : initialCurrencies;
    });

    const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
        null
    );

    const fetchRates = (): void => {
        setCurrencies((prev) => {
            const updated = prev.map((currency) => {
                if (currency.code === "USD" || currency.code === "EUR") {
                    const variation = Math.random() * 0.1 - 0.05;
                    const newRate = currency.rate + variation;
                    const change =
                        ((newRate - currency.rate) / currency.rate) * 100;
                    return { ...currency, rate: newRate, change };
                }
                return currency;
            });
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    useEffect(() => {
        const interval = setInterval(fetchRates, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Cotação de Moedas
                    </h1>
                    <button
                        onClick={fetchRates}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Atualizar
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currencies.map((currency) => (
                        <div
                            key={currency.code}
                            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedCurrency(currency)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {currency.code}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {currency.name}
                                    </p>
                                </div>
                                {currency.change > 0 ? (
                                    <TrendingUp
                                        className="text-green-500"
                                        size={20}
                                    />
                                ) : (
                                    <TrendingDown
                                        className="text-red-500"
                                        size={20}
                                    />
                                )}
                            </div>
                            <div className="mt-2">
                                <p className="text-xl font-bold">
                                    R$ {currency.rate.toFixed(2)}
                                </p>
                                <p
                                    className={`${currency.change > 0 ? "text-green-500" : "text-red-500"} text-sm`}
                                >
                                    {currency.change > 0 ? "+" : ""}
                                    {currency.change.toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedCurrency && (
                <CurrencyDetails
                    currency={selectedCurrency}
                    onClose={() => setSelectedCurrency(null)}
                />
            )}
        </div>
    );
};

export default Home;
