
import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTickets = () => {
    const ticketsSection = document.getElementById('tickets');
    if (ticketsSection) {
      ticketsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-4">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-bollywood-dark z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bollywood-red/20 to-bollywood-dark/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/bollywood-pattern.svg')] opacity-10 bg-repeat z-0"></div>
      </div>
      
      {/* Red glow effect */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-bollywood-red/30 rounded-full filter blur-[100px] animate-glow z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-bollywood-red/20 rounded-full filter blur-[80px] animate-pulse-light z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
        <div 
          className={`transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 px-4 py-1 rounded-full text-sm mb-4 border border-white/20">
            Bollywood Night Party
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 text-shadow">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Dil</span>
            <span className="text-bollywood-red"> Dhadakne </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Do</span>
          </h1>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-shadow-sm">
            Experience the ultimate Bollywood night with music, dance, and glamour. 
            A night filled with your favorite Bollywood hits and performances.
          </p>
        </div>

        {/* Event details card */}
        <div 
          className={`glass-panel p-5 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl transition-all duration-1000 ease-out delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center">
            <Calendar className="text-bollywood-red mr-3" size={20} />
            <div>
              <p className="text-white/60 text-sm">Date</p>
              <p className="text-white font-medium">December 31, 2023</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="text-bollywood-red mr-3" size={20} />
            <div>
              <p className="text-white/60 text-sm">Venue</p>
              <p className="text-white font-medium">S-Lounge, Patiala</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="text-bollywood-red mr-3" size={20} />
            <div>
              <p className="text-white/60 text-sm">Time</p>
              <p className="text-white font-medium">8:00 PM Onwards</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div 
          className={`transition-all duration-1000 ease-out delay-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Link 
            to="/checkout"
            className="bg-bollywood-red text-white px-6 py-3 rounded-xl text-lg font-medium shadow-lg hover:bg-opacity-90 hover:shadow-red-glow transition-all duration-300 animate-float"
          >
            Get Your Tickets Now
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer transition-opacity duration-300 hover:opacity-80 animate-pulse-light z-10"
        onClick={scrollToTickets}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2">Scroll to view tickets</span>
          <ChevronDown className="text-bollywood-red" size={24} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
