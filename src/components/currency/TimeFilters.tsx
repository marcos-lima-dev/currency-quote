import { FC } from "react";
import { ChevronDown } from "lucide-react";

type TimeFilterValue = "1d" | "7d" | "1m" | "6m" | "1a";

interface TimeFilter {
    label: string;
    value: TimeFilterValue;
}

interface TimeFiltersProps {
    selected: TimeFilterValue;
    onChange: (value: TimeFilterValue) => void;
}

const TimeFilters: FC<TimeFiltersProps> = ({ selected, onChange }) => {
    const filters: TimeFilter[] = [
        { label: "1D", value: "1d" },
        { label: "7D", value: "7d" },
        { label: "1M", value: "1m" },
        { label: "6M", value: "6m" },
        { label: "1Y", value: "1a" },
    ];

    return (
        <>
            {/* Desktop view */}
            <div className="hidden md:flex gap-2">
                {filters.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => onChange(value)}
                        className={`px-4 py-2 rounded ${
                            selected === value
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Mobile view */}
            <div className="md:hidden">
                <div className="relative">
                    <select
                        value={selected}
                        onChange={(e) =>
                            onChange(e.target.value as TimeFilterValue)
                        }
                        className="w-full px-4 py-2 pr-8 bg-white border rounded appearance-none"
                    >
                        {filters.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
                </div>
            </div>
        </>
    );
};

export default TimeFilters;
