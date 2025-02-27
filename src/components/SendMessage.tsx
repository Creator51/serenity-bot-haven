
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface SendMessageProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const SendMessage = ({ onSendMessage, isLoading = false }: SendMessageProps) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 bg-secondary rounded-xl p-2"
    >
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 py-2 px-3 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
        disabled={isLoading}
        autoComplete="off"
      />
      <Button 
        type="submit" 
        size="icon"
        className="rounded-lg"
        disabled={!message.trim() || isLoading}
        aria-label="Send message"
      >
        <Send size={18} />
      </Button>
    </form>
  );
};

export default SendMessage;
