import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Notification = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 mb-4 flex justify-between items-center"
  >
    <span>{message}</span>
    <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close notification">
      <X size={18} />
    </Button>
  </motion.div>
);

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulating receiving notifications
    const timer = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New notification at ${new Date().toLocaleTimeString()}`,
      };
      setNotifications(prev => [...prev, newNotification]);
      toast({
        title: "New Notification",
        description: newNotification.message,
      });
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(timer);
  }, []);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <>
      <Button
        variant="outline"
        className="fixed bottom-4 right-4 rounded-full p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${notifications.length} unread notifications`}
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {notifications.length}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-80 max-h-[80vh] overflow-y-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <p>No new notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <Notification
                      key={notification.id}
                      message={notification.message}
                      onClose={() => removeNotification(notification.id)}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}