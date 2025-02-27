
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-r from-serenity-400 to-serenity-600 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">S</span>
            </span>
            <span className="font-medium text-xl">Serenity AI</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-muted-foreground hover:text-foreground transition-colors focus-ring"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-muted-foreground hover:text-foreground transition-colors focus-ring"
          >
            How It Works
          </a>
          <a 
            href="#about" 
            className="text-muted-foreground hover:text-foreground transition-colors focus-ring"
          >
            About
          </a>
        </nav>
        <div>
          <Button 
            size="sm" 
            className="rounded-full px-4 gap-2 hover:scale-105 transition-all"
          >
            <MessageCircle size={18} />
            <span>Start Chatting</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
