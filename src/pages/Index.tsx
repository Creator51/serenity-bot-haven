
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main>
        <HeroSection />
        <Features />
        
        <section id="how-it-works" className="section-padding bg-secondary/50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                How Serenity AI works
              </h2>
              <p className="text-muted-foreground text-lg">
                Our AI companion uses advanced natural language processing to provide meaningful support for your mental wellbeing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-serenity-100 flex items-center justify-center mb-6">
                  <span className="text-serenity-600 font-medium text-xl">1</span>
                </div>
                <h3 className="font-medium text-xl mb-2">Start a conversation</h3>
                <p className="text-muted-foreground">Begin chatting with Serenity about how you're feeling or what's on your mind.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-serenity-100 flex items-center justify-center mb-6">
                  <span className="text-serenity-600 font-medium text-xl">2</span>
                </div>
                <h3 className="font-medium text-xl mb-2">Receive empathetic support</h3>
                <p className="text-muted-foreground">Serenity listens, understands your emotions, and responds with empathy.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-serenity-100 flex items-center justify-center mb-6">
                  <span className="text-serenity-600 font-medium text-xl">3</span>
                </div>
                <h3 className="font-medium text-xl mb-2">Discover helpful insights</h3>
                <p className="text-muted-foreground">Get personalized guidance, coping strategies, and resources for your mental wellbeing.</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-16">
              <Button 
                size="lg" 
                className="rounded-full px-6"
                onClick={() => setIsChatOpen(true)}
              >
                Try it yourself
              </Button>
            </div>
          </div>
        </section>
        
        <section id="about" className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                  Your trusted companion for mental wellbeing
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Serenity AI was created with a simple mission: to make mental health support accessible to everyone, anytime. Our team of mental health professionals and AI specialists designed Serenity to provide compassionate, evidence-based support.
                </p>
                <p className="text-muted-foreground text-lg mb-6">
                  While Serenity is not a replacement for professional therapy, it can be a valuable tool in your mental wellness toolkit—helping you practice mindfulness, work through challenges, and develop healthy coping strategies.
                </p>
                <Button className="rounded-full">Learn about our approach</Button>
              </div>
              
              <div className="bg-secondary rounded-xl p-8 shadow-soft">
                <h3 className="font-medium text-xl mb-4">Important note</h3>
                <p className="mb-4">
                  Serenity AI is designed to provide support and general guidance for mental wellbeing, but it is not a substitute for professional mental health treatment.
                </p>
                <p className="mb-4">
                  If you're experiencing a mental health crisis or emergency, please contact one of these resources immediately:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-serenity-500 mr-2"></span>
                    <span>National Suicide Prevention Lifeline: 988</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-serenity-500 mr-2"></span>
                    <span>Crisis Text Line: Text HOME to 741741</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-serenity-500 mr-2"></span>
                    <span>Emergency Services: 911</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Always consult with qualified mental health professionals for medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Chat Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-medium w-full max-w-xl h-[600px] flex flex-col overflow-hidden animate-fade-in">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-gradient-to-r from-serenity-400 to-serenity-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">S</span>
                </span>
                <h3 className="font-medium">Serenity AI</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </div>
      )}
      
      {/* Floating Chat Button (only visible when chat is closed) */}
      {!isChatOpen && (
        <div className="fixed bottom-4 right-4 z-10">
          <Button 
            size="lg" 
            className="h-14 w-14 rounded-full shadow-medium hover:scale-105 transition-transform"
            onClick={() => setIsChatOpen(true)}
            aria-label="Open chat"
          >
            <span className="sr-only">Chat with Serenity AI</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 13.6 2.39 15.09 3.08 16.4C3.07 16.49 3 16.67 2.82 16.94C2.42 17.53 1.99 18.29 1.87 19.17C1.76 20.03 2.06 20.94 3.03 21.42C3.78 21.79 4.7 21.52 5.54 21.16C6.86 20.58 7.73 19.94 7.73 19.94C9.08 20.63 10.58 21 12.18 21C17.7 21 22.18 16.52 22.18 11C22.18 5.48 17.7 2 12 2ZM8 13C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11C8.55 11 9 11.45 9 12C9 12.55 8.55 13 8 13ZM12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13ZM16 13C15.45 13 15 12.55 15 12C15 11.45 15.45 11 16 11C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z" fill="currentColor"/>
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
