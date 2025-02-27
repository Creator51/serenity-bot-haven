
import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import SendMessage from "./SendMessage";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm Serenity, your mental wellness companion. How are you feeling today?",
    isUser: false,
  }
];

const botResponses = [
  "I understand how that might feel. Could you tell me more about that?",
  "That sounds challenging. What do you think triggered these feelings?",
  "I'm here to listen. How long have you been feeling this way?",
  "Thank you for sharing that with me. Would you like to explore some coping strategies together?",
  "It takes courage to talk about these things. How have you been managing these feelings so far?",
  "I'm noticing that might be difficult for you. Would you like to take a moment to focus on some breathing exercises?",
  "Your wellbeing matters. What's one small thing you could do today to care for yourself?",
  "Sometimes our thoughts can become overwhelming. Let's try to break this down into smaller parts.",
  "You're not alone in feeling this way. Many people experience similar challenges.",
  "I'm wondering if you've noticed any patterns when these feelings arise?"
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsLoading(false);
      
      toast({
        title: "New message",
        description: "Serenity AI has responded to your message",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            animationDelay={index * 300}
          />
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center">
              <span className="animate-pulse-subtle">
                <span className="block h-4 w-4 rounded-full bg-sage-700 opacity-60"></span>
              </span>
            </div>
            <div className="chat-bubble chat-bubble-bot">
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse" style={{ animationDelay: '200ms' }}></div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <SendMessage onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
