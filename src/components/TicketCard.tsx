
import { useState } from 'react';
import { PlusCircle, MinusCircle, Info, Users, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TicketCardProps {
  type: 'STAG' | 'COUPLE';
  price: number;
  description: string;
  features: string[];
}

const TicketCard = ({ type, price, description, features }: TicketCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 0));
  };

  const capacityPercentage = Math.floor(Math.random() * 30) + 60; // Random between 60-90%

  return (
    <div 
      className="ticket-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tag */}
      <div className="absolute top-0 right-0">
        <div className="bg-bollywood-red text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
          {type === 'STAG' ? 'SOLO' : 'DUO'}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 flex items-center">
              {type === 'STAG' ? (
                <User className="inline-block mr-2 text-bollywood-red" size={18} />
              ) : (
                <Users className="inline-block mr-2 text-bollywood-red" size={18} />
              )}
              {type} Entry
            </h3>
            <p className="text-white/70 text-sm">{description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">₹{price}</div>
            <p className="text-white/60 text-xs">per ticket</p>
          </div>
        </div>
        
        {/* Features */}
        <ul className="space-y-2 mb-5">
          {features.map((feature, index) => (
            <li key={index} className="text-white/80 text-sm flex items-start">
              <span className="inline-block w-1 h-1 rounded-full bg-bollywood-red mt-1.5 mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
        
        {/* Capacity bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>Available</span>
            <span>{capacityPercentage}% remaining</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-bollywood-red to-bollywood-red/80"
              style={{ width: `${capacityPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Quantity selector */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-white/80 text-sm">Quantity:</div>
          <div className="flex items-center space-x-2">
            <button 
              className="text-white/80 hover:text-bollywood-red transition-colors"
              onClick={decrementQuantity}
            >
              <MinusCircle size={20} />
            </button>
            <span className="text-white font-medium w-6 text-center">{quantity}</span>
            <button 
              className="text-white/80 hover:text-bollywood-red transition-colors"
              onClick={incrementQuantity}
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
        
        {/* Total */}
        <div className="flex justify-between items-center mb-5">
          <div className="text-white/80">Total:</div>
          <div className="text-xl font-bold text-white">₹{price * quantity}</div>
        </div>
        
        {/* Buy button */}
        <Link 
          to={quantity > 0 ? "/checkout" : "#"}
          className={`w-full block text-center py-3 rounded-lg font-medium transition-all duration-300 ${
            quantity > 0 
              ? "bg-bollywood-red text-white hover:shadow-red-glow" 
              : "bg-white/10 text-white/50 cursor-not-allowed"
          }`}
        >
          {quantity > 0 ? "Buy Now" : "Select Quantity"}
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
