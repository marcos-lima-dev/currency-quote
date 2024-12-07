import { FC } from "react";
import { Moon, Sun, Star, Settings } from "lucide-react";
import { useApp } from "../context/AppContext";

const UserSettings: FC = () => {
    const {
        darkMode,
        toggleDarkMode,
        selectedCurrencies,
        toggleCurrencyVisibility,
    } = useApp();

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Configurações</h2>
            </div>

            <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {darkMode ? (
                            <Moon className="w-4 h-4" />
                        ) : (
                            <Sun className="w-4 h-4" />
                        )}
                        <span>Tema Escuro</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={darkMode}
                            onChange={toggleDarkMode}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                    </label>
                </div>

                {/* Currency Selection */}
                <div className="space-y-4">
                    <h3 className="font-medium">Moedas Exibidas</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(selectedCurrencies).map(
                            ([currency, isSelected]) => (
                                <div
                                    key={currency}
                                    className="flex items-center justify-between p-2 border rounded"
                                >
                                    <div className="flex items-center gap-2">
                                        <Star
                                            className={`w-4 h-4 ${isSelected ? "text-yellow-400" : ""}`}
                                        />
                                        <span>{currency}/BRL</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={isSelected}
                                            onChange={() =>
                                                toggleCurrencyVisibility(
                                                    currency
                                                )
                                            }
                                        />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                    </label>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;