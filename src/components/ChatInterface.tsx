
import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import SendMessage from "./SendMessage";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isComplete?: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm Serenity, your mental wellness companion. How are you feeling today?",
    isUser: false,
    isComplete: true,
  }
];

// Advanced AI responses that are more helpful for mental wellness
const getAIResponse = (userMessage: string): string => {
  // Analyze the user message for keywords
  const lowercaseMessage = userMessage.toLowerCase();
  
  // Check for different emotional states and respond appropriately
  if (lowercaseMessage.includes("anxious") || lowercaseMessage.includes("anxiety") || lowercaseMessage.includes("worried")) {
    return "I notice you mentioned feeling anxious. Anxiety is a natural response to stress, but it can be overwhelming. Would you like to try a quick breathing exercise that might help? Or would you prefer to talk more about what's causing your anxiety?";
  } 
  else if (lowercaseMessage.includes("sad") || lowercaseMessage.includes("depressed") || lowercaseMessage.includes("unhappy")) {
    return "I'm sorry to hear you're feeling down. Many people experience sadness, and it's completely valid to feel this way. Would you like to explore some gentle activities that might lift your mood, or would you prefer to talk more about these feelings?";
  } 
  else if (lowercaseMessage.includes("happy") || lowercaseMessage.includes("good") || lowercaseMessage.includes("great")) {
    return "I'm glad to hear you're feeling positive! What's contributing to your good mood today? Recognizing what brings us joy can be helpful when we face challenging times.";
  }
  else if (lowercaseMessage.includes("tired") || lowercaseMessage.includes("exhausted") || lowercaseMessage.includes("fatigue")) {
    return "Feeling tired can affect both our physical and mental wellbeing. Are you getting enough rest? Sometimes mental fatigue can be just as draining as physical tiredness. Would you like to discuss some strategies for managing your energy levels?";
  }
  else if (lowercaseMessage.includes("stressed") || lowercaseMessage.includes("overwhelmed")) {
    return "Feeling overwhelmed is common in our busy world. It might help to break down what's causing your stress into smaller, more manageable parts. Would you like to talk about specific stressors in your life, or would you prefer some immediate stress-reduction techniques?";
  }
  else if (lowercaseMessage.includes("help") || lowercaseMessage.includes("need advice")) {
    return "I'm here to support you. To help in the most effective way, could you share a bit more about what you're looking for help with? While I'm not a replacement for professional support, I can offer a listening ear and some general wellness strategies.";
  }
  else if (lowercaseMessage.includes("thank")) {
    return "You're very welcome. I'm here to support you whenever you need to talk or reflect. Is there anything else on your mind today?";
  }
  else {
    // For messages without specific keywords, use a general therapeutic response
    const generalResponses = [
      "Thank you for sharing that with me. Could you tell me more about how that makes you feel?",
      "I appreciate you opening up. In what ways has this been affecting your daily life?",
      "That sounds significant. How long have you been experiencing this?",
      "I'm here to listen. What do you think might help you navigate this situation?",
      "It takes courage to discuss these things. Have you found any strategies that help you cope with this?",
      "Your experiences matter. How would you like things to be different?",
      "I'm curious about what support might be most helpful for you right now?",
      "That's understandable. Many people experience similar feelings. What usually helps when you feel this way?",
      "I'm wondering if you've noticed any patterns or triggers related to what you're describing?",
      "Thank you for trusting me with this. Would it be helpful to explore some potential coping strategies together?"
    ];
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate streaming text effect for AI responses
  useEffect(() => {
    if (streamingMessageId) {
      const message = messages.find(m => m.id === streamingMessageId);
      if (message && !message.isComplete) {
        const fullText = message.text;
        let currentIndex = 0;
        
        const interval = setInterval(() => {
          currentIndex += 1;
          if (currentIndex <= fullText.length) {
            setMessages(prevMessages => 
              prevMessages.map(m => 
                m.id === streamingMessageId 
                  ? { ...m, text: fullText.substring(0, currentIndex) } 
                  : m
              )
            );
          } else {
            clearInterval(interval);
            setMessages(prevMessages => 
              prevMessages.map(m => 
                m.id === streamingMessageId 
                  ? { ...m, isComplete: true } 
                  : m
              )
            );
            setStreamingMessageId(null);
            setIsLoading(false);
            
            toast({
              title: "New message",
              description: "Serenity AI has responded to your message",
            });
          }
        }, 20); // Adjust speed of text appearance

        return () => clearInterval(interval);
      }
    }
  }, [streamingMessageId, messages, toast]);

  const handleSendMessage = (text: string) => {
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      isComplete: true,
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    
    // Generate AI response
    const aiResponse = getAIResponse(text);
    
    // Small delay to simulate processing
    setTimeout(() => {
      const newBotMessageId = (Date.now() + 1).toString();
      
      const newBotMessage: Message = {
        id: newBotMessageId,
        text: "", // Start empty for streaming effect
        isUser: false,
        isComplete: false,
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setStreamingMessageId(newBotMessageId);
      
      // Store full response in a hidden property to stream it
      Object.defineProperty(newBotMessage, 'fullText', {
        value: aiResponse,
        writable: true,
        enumerable: false
      });
      
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
        {isLoading && streamingMessageId === null && (
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
