import { AlertCircle, CheckCircle, Info, AlertTriangle, Bell, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { Notification } from "../../../drizzle/schema";

interface NotificationBannerProps {
  notification: Notification;
  onClose?: (id: number) => void;
}

export default function NotificationBanner({ notification, onClose }: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (notification.expiresAt && new Date(notification.expiresAt) < new Date()) {
      setIsVisible(false);
    }
  }, [notification.expiresAt]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "match_alert":
        return <Bell className="w-5 h-5 text-accent" />;
      case "announcement":
        return <Bell className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "match_alert":
        return "bg-accent/10 border-accent";
      case "announcement":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose(notification.id);
    }
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 flex items-start gap-3 ${getBgColor()}`}>
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-heading font-semibold text-foreground">
          {notification.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {notification.message}
        </p>
        {notification.actionUrl && (
          <a
            href={notification.actionUrl}
            className="text-sm font-heading text-accent hover:text-accent/80 mt-2 inline-block"
          >
            {notification.actionLabel || "View Details"} →
          </a>
        )}
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
