import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
    favoritesCurrencies: string[];
    toggleFavorite: (currencyCode: string) => void;
    selectedCurrencies: Record<string, boolean>;
    toggleCurrencyVisibility: (currencyCode: string) => void;
    rates: Record<string, number>;
    setRates: (rates: Record<string, number>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : false;
    });

    const [favoritesCurrencies, setFavoritesCurrencies] = useState<string[]>(
        () => {
            const saved = localStorage.getItem("favorites");
            return saved ? JSON.parse(saved) : [];
        }
    );

    // AQUI ESTAVA O ERRO - Agora corrigido:
    const [selectedCurrencies, setSelectedCurrencies] = useState<
        Record<string, boolean>
    >(() => {
        const saved = localStorage.getItem("selectedCurrencies");
        return saved
            ? JSON.parse(saved)
            : {
                  USD: true,
                  EUR: true,
                  GBP: true,
                  JPY: true,
                  CHF: true,
                  AUD: true,
              };
    });

    const [rates, setRates] = useState<Record<string, number>>({});

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favoritesCurrencies));
    }, [favoritesCurrencies]);

    useEffect(() => {
        localStorage.setItem(
            "selectedCurrencies",
            JSON.stringify(selectedCurrencies)
        );
    }, [selectedCurrencies]);

    const toggleDarkMode = () => setDarkMode((prev: boolean) => !prev);

    const toggleFavorite = (currencyCode: string) => {
        setFavoritesCurrencies((prev) =>
            prev.includes(currencyCode)
                ? prev.filter((code) => code !== currencyCode)
                : [...prev, currencyCode]
        );
    };

    const toggleCurrencyVisibility = (currencyCode: string) => {
        setSelectedCurrencies((prev) => ({
            ...prev,
            [currencyCode]: !prev[currencyCode],
        }));
    };

    return (
        <AppContext.Provider
            value={{
                darkMode,
                toggleDarkMode,
                favoritesCurrencies,
                toggleFavorite,
                selectedCurrencies,
                toggleCurrencyVisibility,
                rates,
                setRates,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
