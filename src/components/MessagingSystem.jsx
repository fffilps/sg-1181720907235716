import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessagingSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    // Simulate a response from the other party
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { 
        text: "Thank you for your message. We'll get back to you soon.", 
        sender: 'other' 
      }]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          className="fixed bottom-4 right-4 rounded-full p-4"
          onClick={toggleChat}
          aria-label={isOpen ? "Close messaging" : "Open messaging"}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto">
                {messages.map((message, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mb-2 p-2 rounded-lg ${
                      message.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter>
                <div className="flex w-full">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-grow mr-2"
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}