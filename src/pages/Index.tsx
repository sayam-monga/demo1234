
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TicketCard from '../components/TicketCard';
import EventDetails from '../components/EventDetails';
import FooterSection from '../components/FooterSection';
import { toast } from 'sonner';

const ticketTypes = [
  {
    type: 'STAG' as const,
    price: 250,
    description: 'Individual package with all party amenities',
    features: [
      'Entry for one person',
      'Welcome drink',
      'Access to dance floor',
      'Photo booth access'
    ]
  },
  {
    type: 'COUPLE' as const,
    price: 400,
    description: 'Premium package for two with special benefits',
    features: [
      'Entry for two persons',
      'Two welcome drinks',
      'Access to dance floor',
      'Photo booth access',
      'Reserved seating area'
    ]
  }
];

const Index = () => {
  const [isTicketsSectionVisible, setIsTicketsSectionVisible] = useState(false);
  const ticketsSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Show welcome toast
    setTimeout(() => {
      toast.success("Welcome to BollyNights!", {
        description: "Explore and book your tickets for the ultimate Bollywood party.",
        duration: 5000,
      });
    }, 1000);
    
    // Setup intersection observer for fade-in effect
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTicketsSectionVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (ticketsSectionRef.current) {
      observer.observe(ticketsSectionRef.current);
    }
    
    return () => {
      if (ticketsSectionRef.current) {
        observer.unobserve(ticketsSectionRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-bollywood-dark overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Tickets Section */}
      <div 
        id="tickets" 
        ref={ticketsSectionRef}
        className="py-20 px-4 relative"
      >
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-bollywood-red/10 rounded-full filter blur-[100px] animate-pulse-light"></div>
        
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-bollywood-red/10 text-bollywood-red px-4 py-1 rounded-full text-sm mb-4">
              Limited Availability
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Ticket
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Select the perfect ticket package for you and your friends. 
              Limited tickets available, book now to secure your spot.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ticketTypes.map((ticket, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ease-out ${
                  isTicketsSectionVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <TicketCard {...ticket} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <EventDetails />
      
      {/* Gallery Preview Section (simplified for now) */}
      <div className="py-20 px-4 bg-bollywood-dark-accent/50">
        <div className="container mx-auto text-center">
          <span className="inline-block bg-bollywood-red/10 text-bollywood-red px-4 py-1 rounded-full text-sm mb-4">
            Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Glimpses of Past Events
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-12">
            Relive the memories from our previous Bollywood nights and get a taste of what awaits you.
          </p>
          
          {/* Grid of placeholder images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className="aspect-square bg-gradient-to-tr from-bollywood-dark to-bollywood-dark-accent rounded-lg overflow-hidden border border-white/10"
              >
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  Gallery Image {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Index;
