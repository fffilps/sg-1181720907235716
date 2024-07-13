import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { MessageCircle, X } from 'lucide-react';

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    // Simulate a response from the support team
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { 
        text: "Thank you for your message. Our support team will get back to you soon.", 
        sender: 'support' 
      }]);
    }, 1000);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat support" : "Open chat support"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>Chat Support</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                }`}
              >
                {message.text}
              </div>
            ))}
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
      )}
    </>
  );
}