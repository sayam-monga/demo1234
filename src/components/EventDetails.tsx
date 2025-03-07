
import { useState, useEffect, useRef } from 'react';
import { Award, Music, Camera, MicVocal, Sparkles } from 'lucide-react';

const EventDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      icon: <Music className="text-bollywood-red" size={24} />,
      title: "Live DJ Performance",
      description: "Dance to the rhythm of Bollywood beats mixed by our celebrity DJ"
    },
    {
      icon: <MicVocal className="text-bollywood-red" size={24} />,
      title: "Live Singers",
      description: "Enjoy performances by talented vocalists singing your favorite Bollywood hits"
    },
    {
      icon: <Camera className="text-bollywood-red" size={24} />,
      title: "Photo Booth",
      description: "Capture memories with friends in our themed photo booth"
    },
    {
      icon: <Sparkles className="text-bollywood-red" size={24} />,
      title: "Special Effects",
      description: "Experience spectacular light shows and special effects throughout the night"
    }
  ];
  
  return (
    <div 
      ref={sectionRef}
      className="py-20 px-4"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-bollywood-red/10 text-bollywood-red px-4 py-1 rounded-full text-sm mb-4">
            Event Highlights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience The Magic
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Immerse yourself in the vibrant world of Bollywood with spectacular performances, 
            energetic music, and an atmosphere that celebrates the spirit of Indian cinema.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`glass-panel p-6 transition-all duration-500 ease-out ${
                isVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Event timeline */}
        <div 
          className={`mt-16 glass-panel p-8 max-w-3xl mx-auto transition-all duration-500 ease-out ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Event Timeline</h3>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 w-24 text-right pr-4 text-bollywood-red font-medium">
                8:00 PM
              </div>
              <div className="flex-grow pl-4 border-l border-white/20">
                <h4 className="text-white font-medium">Doors Open</h4>
                <p className="text-white/70 text-sm">Welcome drinks and appetizers</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 text-right pr-4 text-bollywood-red font-medium">
                9:00 PM
              </div>
              <div className="flex-grow pl-4 border-l border-white/20">
                <h4 className="text-white font-medium">DJ Sets Begin</h4>
                <p className="text-white/70 text-sm">Dance floor opens with classic Bollywood hits</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 text-right pr-4 text-bollywood-red font-medium">
                10:30 PM
              </div>
              <div className="flex-grow pl-4 border-l border-white/20">
                <h4 className="text-white font-medium">Live Performance</h4>
                <p className="text-white/70 text-sm">Special guest artist performance</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 text-right pr-4 text-bollywood-red font-medium">
                11:45 PM
              </div>
              <div className="flex-grow pl-4 border-l border-white/20">
                <h4 className="text-white font-medium">Countdown Begins</h4>
                <p className="text-white/70 text-sm">Get ready for the midnight celebration</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 text-right pr-4 text-bollywood-red font-medium">
                12:00 AM
              </div>
              <div className="flex-grow pl-4 border-l border-white/20">
                <h4 className="text-white font-medium">New Year Celebration</h4>
                <p className="text-white/70 text-sm">Spectacular light show and confetti</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 text-right pr-4 text-bollywood-red font-medium">
                2:00 AM
              </div>
              <div className="flex-grow pl-4 border-l border-white/20">
                <h4 className="text-white font-medium">Event Concludes</h4>
                <p className="text-white/70 text-sm">Thank you for joining us!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
