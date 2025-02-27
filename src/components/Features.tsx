
import { MessageSquare, Shield, Clock, HeartPulse, BrainCircuit, User } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Supportive Conversations",
    description: "Have natural, judgment-free conversations about your feelings, thoughts, and challenges."
  },
  {
    icon: BrainCircuit,
    title: "Personalized Guidance",
    description: "Receive tailored insights and strategies based on your unique situation and needs."
  },
  {
    icon: HeartPulse,
    title: "Emotional Tracking",
    description: "Monitor your emotional patterns over time to understand your mental health journey."
  },
  {
    icon: Clock,
    title: "Available 24/7",
    description: "Access support whenever you need it, day or night, without scheduling or waiting."
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your conversations remain completely private with advanced security measures."
  },
  {
    icon: User,
    title: "Human-Centered Design",
    description: "Experience an interface designed with empathy, accessibility, and ease of use."
  }
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
            Thoughtfully designed for your wellbeing
          </h2>
          <p className="text-muted-foreground text-lg">
            Serenity AI combines advanced technology with compassionate design to support your mental health journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-6 shadow-soft border transition-all duration-300 hover:shadow-medium hover:translate-y-[-4px]"
            >
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
                <feature.icon size={24} className="text-serenity-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
