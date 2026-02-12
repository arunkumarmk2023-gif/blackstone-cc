import { trpc } from "@/lib/trpc";
import NotificationBanner from "./NotificationBanner";
import { Loader2 } from "lucide-react";

export default function NotificationCenter() {
  const { data: notifications, isLoading } = trpc.notifications.list.useQuery();
  const markAsReadMutation = trpc.notifications.markAsRead.useMutation();

  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate({ id });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationBanner
          key={notification.id}
          notification={notification}
          onClose={handleMarkAsRead}
        />
      ))}
    </div>
  );
}
