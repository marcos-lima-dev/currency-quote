export type Notification = {
    id: number;
    title: string;
    message: string;
    timestamp: Date;
};

export interface Trigger {
    id: number;
    currency: string;
    type: "above" | "below";
    value: number;
    enabled: boolean;
}

export interface NewTriggerFormProps {
    trigger: Omit<Trigger, "id">;
    onChange: (trigger: Omit<Trigger, "id">) => void;
    onAdd: () => void;
}

export interface NotificationListProps {
    notifications: Notification[];
    onClear: (id: number) => void;
}
