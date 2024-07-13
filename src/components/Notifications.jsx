import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Notification = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 mb-4 flex justify-between items-center"
  >
    <span>{message}</span>
    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
      <X size={18} />
    </button>
  </motion.div>
);

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating receiving notifications
    const timer = setTimeout(() => {
      setNotifications([
        { id: 1, message: "New Environmental Grant available!" },
        { id: 2, message: "Your Tech Innovation Fund application was approved!" },
      ]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}