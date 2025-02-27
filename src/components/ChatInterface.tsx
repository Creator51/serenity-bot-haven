
import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import SendMessage from "./SendMessage";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isComplete?: boolean;
  fullText?: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm Serenity, your mental wellness companion. How are you feeling today?",
    isUser: false,
    isComplete: true,
  }
];

// Fallback responses in case the AI service is unavailable
const getFallbackResponse = (userMessage: string): string => {
  const lowercaseMessage = userMessage.toLowerCase();
  
  if (lowercaseMessage.includes("anxious") || lowercaseMessage.includes("anxiety") || lowercaseMessage.includes("worried")) {
    return "I notice you mentioned feeling anxious. Anxiety is a natural response to stress, but it can be overwhelming. Would you like to try a quick breathing exercise that might help? Or would you prefer to talk more about what's causing your anxiety?";
  } 
  else if (lowercaseMessage.includes("sad") || lowercaseMessage.includes("depressed") || lowercaseMessage.includes("unhappy")) {
    return "I'm sorry to hear you're feeling down. Many people experience sadness, and it's completely valid to feel this way. Would you like to explore some gentle activities that might lift your mood, or would you prefer to talk more about these feelings?";
  } 
  else if (lowercaseMessage.includes("happy") || lowercaseMessage.includes("good") || lowercaseMessage.includes("great")) {
    return "I'm glad to hear you're feeling positive! What's contributing to your good mood today? Recognizing what brings us joy can be helpful when we face challenging times.";
  }
  else {
    const generalResponses = [
      "Thank you for sharing that with me. Could you tell me more about how that makes you feel?",
      "I appreciate you opening up. In what ways has this been affecting your daily life?",
      "That sounds significant. How long have you been experiencing this?",
      "I'm here to listen. What do you think might help you navigate this situation?"
    ];
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
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
      const messageIndex = messages.findIndex(m => m.id === streamingMessageId);
      if (messageIndex !== -1 && !messages[messageIndex].isComplete && messages[messageIndex].fullText) {
        const fullText = messages[messageIndex].fullText as string;
        let currentIndex = 0;
        
        const interval = setInterval(() => {
          currentIndex += 3; // Increase by 3 to make it faster
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

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('https://api.supabase.co/functions/v1/serenity-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from AI service:', errorData);
        setApiError('Could not reach the AI service. Using fallback response.');
        return getFallbackResponse(userMessage);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling AI service:', error);
      setApiError('Could not reach the AI service. Using fallback response.');
      return getFallbackResponse(userMessage);
    }
  };

  const handleSendMessage = async (text: string) => {
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
    try {
      const newBotMessageId = (Date.now() + 1).toString();
      
      // Start with an empty bot message
      const newBotMessage: Message = {
        id: newBotMessageId,
        text: "", // Start empty for streaming effect
        isUser: false,
        isComplete: false,
        fullText: "", // Will be populated after API call
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      
      // Get AI response
      const aiResponse = await getAIResponse(text);
      
      // Update the bot message with the full text
      setMessages(prev => 
        prev.map(m => 
          m.id === newBotMessageId 
            ? { ...m, fullText: aiResponse } 
            : m
        )
      );
      
      // Start streaming effect
      setStreamingMessageId(newBotMessageId);
      
      if (apiError) {
        toast({
          title: "Notice",
          description: apiError,
          variant: "destructive",
        });
        setApiError(null);
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setIsLoading(false);
      
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
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
