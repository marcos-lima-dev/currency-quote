import { FC, useState, useEffect, useCallback } from "react";
import { Bell, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import NotificationList from "./NotificationList";
import NewTriggerForm from "./NewTriggerForm";
import type { Notification, Trigger } from "./types"; // Mudamos para type import

const NotificationSystem: FC = () => {
    const { rates } = useApp();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [triggers, setTriggers] = useState<Trigger[]>([]);
    const [newTrigger, setNewTrigger] = useState<Omit<Trigger, "id">>({
        currency: "USD",
        type: "above",
        value: 0,
        enabled: true,
    });

    const createNotification = useCallback((title: string, message: string) => {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(title, { body: message });
        }

        setNotifications((prev) => [
            {
                id: Date.now(),
                title,
                message,
                timestamp: new Date(),
            },
            ...prev,
        ]);
    }, []);

    const addTrigger = useCallback(() => {
        if (newTrigger.value <= 0) {
            createNotification("Erro", "O valor deve ser maior que zero");
            return;
        }

        setTriggers((prev) => [...prev, { ...newTrigger, id: Date.now() }]);
        setNewTrigger({
            currency: "USD",
            type: "above",
            value: 0,
            enabled: true,
        });
    }, [newTrigger, createNotification]);

    const removeTrigger = useCallback((triggerId: number) => {
        setTriggers((prev) => prev.filter((t) => t.id !== triggerId));
    }, []);

    const clearNotification = useCallback((notificationId: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    }, []);

    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        const checkTriggers = () => {
            triggers.forEach((trigger) => {
                if (!trigger.enabled) return;

                const currentRate = rates[trigger.currency];

                if (currentRate) {
                    const shouldNotify =
                        (trigger.type === "above" &&
                            currentRate > trigger.value) ||
                        (trigger.type === "below" &&
                            currentRate < trigger.value);

                    if (shouldNotify) {
                        createNotification(
                            `Alerta ${trigger.currency}/BRL`,
                            `${trigger.currency} ${trigger.type === "above" ? "está acima de" : "está abaixo de"} R$ ${currentRate.toFixed(2)}`
                        );

                        setTriggers((prev) =>
                            prev.map((t) =>
                                t.id === trigger.id
                                    ? { ...t, enabled: false }
                                    : t
                            )
                        );
                    }
                }
            });
        };

        const interval = setInterval(checkTriggers, 1000);
        return () => clearInterval(interval);
    }, [triggers, rates, createNotification]);

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                <Bell className="h-5 w-5" />
                <h2 className="text-lg font-semibold">
                    Central de Notificações
                </h2>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-medium">Adicionar Novo Alerta</h3>
                    <NewTriggerForm
                        trigger={newTrigger}
                        onChange={setNewTrigger}
                        onAdd={addTrigger}
                    />
                </div>

                <div>
                    <h3 className="font-medium mb-2">Alertas Ativos</h3>
                    <div className="space-y-2">
                        {triggers.map((trigger) => (
                            <div
                                key={trigger.id}
                                className="flex items-center justify-between p-2 border rounded"
                            >
                                <span>
                                    {trigger.currency}/BRL{" "}
                                    {trigger.type === "above"
                                        ? "acima de"
                                        : "abaixo de"}{" "}
                                    {trigger.value}
                                </span>
                                <button
                                    onClick={() => removeTrigger(trigger.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        {triggers.length === 0 && (
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Nenhum alerta configurado
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-medium mb-2">Notificações Recentes</h3>
                    <NotificationList
                        notifications={notifications}
                        onClear={clearNotification}
                    />
                    {notifications.length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Nenhuma notificação recente
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationSystem;
