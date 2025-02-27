
import { useState, useEffect } from "react";
import { User, Bot } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  animationDelay?: number;
}

const ChatBubble = ({ message, isUser, animationDelay = 0 }: ChatBubbleProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  return (
    <div 
      className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center">
          <Bot size={16} className="text-sage-700" />
        </div>
      )}
      
      <div 
        className={`chat-bubble ${
          isUser ? 'chat-bubble-user' : 'chat-bubble-bot'
        } max-w-[80%]`}
      >
        <p className="whitespace-pre-line">{message}</p>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-serenity-600 flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
