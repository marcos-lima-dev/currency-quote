import { FC } from "react";
import { X } from "lucide-react";
import { Notification, NotificationListProps } from "./types";

const NotificationList: FC<NotificationListProps> = ({
    notifications,
    onClear,
}) => {
    return (
        <div className="space-y-2">
            {notifications.map((notification: Notification) => (
                <div
                    key={notification.id}
                    className="flex items-center justify-between p-2 border rounded"
                >
                    <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-600">
                            {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                            {notification.timestamp.toLocaleString()}
                        </p>
                    </div>
                    <button
                        onClick={() => onClear(notification.id)}
                        className="text-red-500 hover:text-red-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
