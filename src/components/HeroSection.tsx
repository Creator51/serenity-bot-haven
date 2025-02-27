
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, HeartPulse } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden hero-gradient">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full bg-sage-100 px-3 py-1 text-sm mb-6 animate-fade-in">
            <HeartPulse size={16} className="mr-2 text-serenity-600" />
            <span>Mental wellness made conversational</span>
          </div>
          
          <h1 className="font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Your AI companion for mental wellbeing
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '200ms' }}>
            Serenity AI provides supportive conversations, guided reflections, and practical tools to help you navigate life's challenges with confidence and clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Button size="lg" className="rounded-full px-6 py-6 text-base hover:scale-105 transition-transform">
              Start a conversation
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-6 py-6 text-base group">
              Learn more
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16 md:mt-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none z-10 h-24"></div>
        <div className="max-w-4xl mx-auto rounded-t-3xl overflow-hidden shadow-soft bg-card border animate-fade-up" style={{ animationDelay: '400ms' }}>
          <div className="pt-6 px-6 bg-gradient-to-r from-serenity-100 to-sage-50">
            <div className="flex space-x-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-sage-300"></div>
              <div className="w-3 h-3 rounded-full bg-serenity-300"></div>
              <div className="w-3 h-3 rounded-full bg-lavender-300"></div>
            </div>
            <div className="rounded-t-xl bg-card p-4 shadow-sm">
              <div className="flex flex-col space-y-4">
                <div className="chat-bubble chat-bubble-bot animate-fade-in" style={{ animationDelay: '500ms' }}>
                  <p>Hello! I'm Serenity, your mental wellness companion. How are you feeling today?</p>
                </div>
                <div className="chat-bubble chat-bubble-user animate-fade-in" style={{ animationDelay: '700ms' }}>
                  <p>I've been feeling a bit overwhelmed with work lately.</p>
                </div>
                <div className="chat-bubble chat-bubble-bot animate-fade-in" style={{ animationDelay: '900ms' }}>
                  <p>I understand. Work stress can be challenging. Would you like to talk about specific situations that feel overwhelming, or would you prefer some techniques to help manage stress?</p>
                </div>
                <div className="h-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
