import { useState } from "react";
import { PlusCircle, MinusCircle, Info, Users, User } from "lucide-react";
import { Link } from "react-router-dom";

interface TicketCardProps {
  type: "STAG" | "COUPLE";
  price: number;
  description: string;
  features: string[];
  onQuantityChange?: (type: "STAG" | "COUPLE", quantity: number) => void;
}

const TicketCard = ({
  type,
  price,
  description,
  features,
  onQuantityChange,
}: TicketCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const incrementQuantity = () => {
    const newQuantity = Math.min(quantity + 1, 10);
    setQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(type, newQuantity);
    }
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    setQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(type, newQuantity);
    }
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
          {type === "STAG" ? "SOLO" : "DUO"}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 flex items-center">
              {type === "STAG" ? (
                <User
                  className="inline-block mr-2 text-bollywood-red"
                  size={18}
                />
              ) : (
                <Users
                  className="inline-block mr-2 text-bollywood-red"
                  size={18}
                />
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

        {/* Quantity selector */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-white/80 text-sm">Quantity:</div>
          <div className="flex items-center space-x-4">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-bollywood-red/20 transition-colors"
              onClick={decrementQuantity}
              disabled={quantity <= 0}
            >
              <MinusCircle size={18} />
            </button>
            <span className="text-white font-medium w-6 text-center">
              {quantity}
            </span>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-bollywood-red/20 transition-colors"
              onClick={incrementQuantity}
              disabled={quantity >= 10}
            >
              <PlusCircle size={18} />
            </button>
          </div>
        </div>
        <hr className="py-2" />
        {/* Total */}
        <div className="flex justify-between items-center mb-5">
          <div className="text-white/80">Total:</div>
          <div className="text-xl font-bold text-white">
            ₹{price * quantity}
          </div>
        </div>

        {/* Buy button */}
        <Link
          to={quantity > 0 ? "/checkout" : "#"}
          state={
            quantity > 0 ? { ticketType: type, quantity, price } : undefined
          }
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
