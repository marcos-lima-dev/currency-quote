import { FC } from "react";
import { NewTriggerFormProps } from "./types";

const NewTriggerForm: FC<NewTriggerFormProps> = ({
    trigger,
    onChange,
    onAdd,
}) => {
    return (
        <div className="block sm:flex sm:gap-2 sm:max-w-sm">
            <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-0">
                <select
                    value={trigger.currency}
                    onChange={(e) =>
                        onChange({ ...trigger, currency: e.target.value })
                    }
                    className="flex-1 sm:flex-none sm:w-24 px-2 py-1 border rounded"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                </select>

                <select
                    value={trigger.type}
                    onChange={(e) =>
                        onChange({
                            ...trigger,
                            type: e.target.value as "above" | "below",
                        })
                    }
                    className="flex-1 sm:flex-none sm:w-24 px-2 py-1 border rounded"
                >
                    <option value="above">Acima</option>
                    <option value="below">Abaixo</option>
                </select>

                <input
                    type="number"
                    value={trigger.value}
                    onChange={(e) =>
                        onChange({ ...trigger, value: Number(e.target.value) })
                    }
                    className="w-14 sm:w-20 px-2 py-1 border rounded" // Reduzida a largura apenas em mobile
                    placeholder="Valor"
                />
            </div>

            <button
                onClick={onAdd}
                className="w-full sm:w-auto px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Adicionar
            </button>
        </div>
    );
};

export default NewTriggerForm;
