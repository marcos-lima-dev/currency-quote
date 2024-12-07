import { FC, useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
type ValueType = string | number | Array<string | number>;
import { fetchHistoricalRates } from "../../services/api";

interface HistoricalData {
    timestamp: string;
    value: number;
}

interface HistoricalChartProps {
    currencyPair?: string;
}

type TimeFilterType = "1d" | "7d" | "1m" | "6m" | "1a";

const HistoricalChart: FC<HistoricalChartProps> = ({
    currencyPair = "USD-BRL",
}) => {
    const [timeFilter, setTimeFilter] = useState<TimeFilterType>("1d");
    const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await fetchHistoricalRates(
                    currencyPair,
                    timeFilter
                );
                if (data.length === 0) {
                    throw new Error("No data available for this period");
                }

                setHistoricalData(data);
            } catch (err) {
                const error = err as Error;
                setError(error.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [timeFilter, currencyPair]);

    const formatTooltipValue = (value: ValueType): [string, string] => {
        if (typeof value === "number") {
            return [`${value.toFixed(4)}`, "Rate"];
        }
        return ["0", "Rate"];
    };

    const formatXAxisTick = (timestamp: number): string => {
        const date = new Date(timestamp);
        return timeFilter === "1d"
            ? date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
              })
            : date.toLocaleDateString();
    };

    const formatYAxisTick = (value: number): string => {
        return value.toFixed(2);
    };

    const formatTooltipLabel = (timestamp: number): string => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow">
            <div className="mb-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h2 className="text-xl md:text-2xl font-bold">
                        {currencyPair.replace("-", "/")} Exchange Rate
                    </h2>
                    <div className="flex gap-2">
                        {[
                            { label: "1D", value: "1d" },
                            { label: "7D", value: "7d" },
                            { label: "1M", value: "1m" },
                            { label: "6M", value: "6m" },
                            { label: "1Y", value: "1a" },
                        ].map(({ label, value }) => (
                            <button
                                key={label}
                                onClick={() =>
                                    setTimeFilter(value as TimeFilterType)
                                }
                                className={`px-4 py-2 rounded ${
                                    timeFilter === value
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {error ? (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            ) : (
                <div className="h-64 md:h-96 w-full">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            Loading...
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={historicalData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={formatXAxisTick}
                                />
                                <YAxis
                                    domain={["auto", "auto"]}
                                    tickFormatter={formatYAxisTick}
                                />
                                <Tooltip
                                    formatter={formatTooltipValue}
                                    labelFormatter={formatTooltipLabel}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2563eb"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoricalChart;
