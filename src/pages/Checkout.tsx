
import { useState } from 'react';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Simplified checkout steps
const steps = [
  { id: 'ticket', label: 'Tickets' },
  { id: 'details', label: 'Details' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Confirmation' }
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState('ticket');
  const [formData, setFormData] = useState({
    ticketType: 'STAG',
    quantity: 1,
    name: '',
    email: '',
    phone: '',
    termsAccepted: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleNext = () => {
    let nextStep = '';
    
    switch (currentStep) {
      case 'ticket':
        nextStep = 'details';
        break;
      case 'details':
        if (!formData.name || !formData.email || !formData.phone) {
          toast.error("Please fill all required fields");
          return;
        }
        if (!formData.termsAccepted) {
          toast.error("Please accept the terms and conditions");
          return;
        }
        nextStep = 'payment';
        break;
      case 'payment':
        // Process payment (simplified for demo)
        toast.success("Payment processed successfully!");
        nextStep = 'confirm';
        break;
      default:
        nextStep = currentStep;
    }
    
    setCurrentStep(nextStep);
  };
  
  // Calculate price based on ticket type and quantity
  const getPrice = () => {
    const basePrice = formData.ticketType === 'STAG' ? 250 : 400;
    return basePrice * formData.quantity;
  };
  
  return (
    <div className="min-h-screen bg-bollywood-dark flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center text-white/70 hover:text-bollywood-red mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to event
          </Link>
          
          {/* Progress tracker */}
          <div className="mb-10">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className="flex flex-col items-center relative"
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === step.id 
                        ? 'bg-bollywood-red text-white'
                        : steps.indexOf(steps.find(s => s.id === currentStep)!) > index
                          ? 'bg-bollywood-red text-white'
                          : 'bg-white/10 text-white/50'
                    } z-10`}
                  >
                    {steps.indexOf(steps.find(s => s.id === currentStep)!) > index ? (
                      <Check size={16} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span 
                    className={`text-sm mt-2 ${
                      currentStep === step.id 
                        ? 'text-bollywood-red'
                        : 'text-white/50'
                    }`}
                  >
                    {step.label}
                  </span>
                  
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div 
                      className={`absolute top-4 left-8 w-[calc(100%-2rem)] h-0.5 -translate-y-1/2 ${
                        steps.indexOf(steps.find(s => s.id === currentStep)!) > index
                          ? 'bg-bollywood-red'
                          : 'bg-white/10'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Content based on current step */}
          <div className="glass-panel p-8 rounded-xl">
            {currentStep === 'ticket' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Select Tickets</h2>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-white mb-2">Ticket Type</label>
                    <select
                      name="ticketType"
                      value={formData.ticketType}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="STAG">STAG Entry (₹250)</option>
                      <option value="COUPLE">COUPLE Entry (₹400)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Quantity</label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg mb-8">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-2xl font-bold text-white">₹{getPrice()}</span>
                </div>
              </div>
            )}
            
            {currentStep === 'details' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Details</h2>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-white mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mr-2 mt-1"
                    />
                    <span className="text-white/70 text-sm">
                      I agree to the <a href="#" className="text-bollywood-red">Terms and Conditions</a> and <a href="#" className="text-bollywood-red">Privacy Policy</a>
                    </span>
                  </label>
                </div>
              </div>
            )}
            
            {currentStep === 'payment' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">Payment</h2>
                
                <div className="p-4 bg-white/5 rounded-lg mb-6 flex items-center">
                  <AlertCircle className="text-bollywood-red mr-2" size={20} />
                  <p className="text-white/80 text-sm">
                    This is a demo payment page. No actual payment will be processed.
                  </p>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-white mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg mb-8">
                  <span className="text-white">Amount to Pay:</span>
                  <span className="text-2xl font-bold text-white">₹{getPrice()}</span>
                </div>
              </div>
            )}
            
            {currentStep === 'confirm' && (
              <div className="animate-fade-in text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bollywood-red mb-6">
                  <Check size={32} className="text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h2>
                <p className="text-white/70 mb-8">
                  Thank you for your purchase. Your tickets have been booked successfully. 
                  We've sent a confirmation email to {formData.email}.
                </p>
                
                <div className="glass-panel p-6 mb-8 mx-auto max-w-md">
                  <h3 className="text-xl font-semibold text-white mb-4">Booking Details</h3>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-white/70">Ticket Type:</span>
                      <span className="text-white font-medium">{formData.ticketType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Quantity:</span>
                      <span className="text-white font-medium">{formData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Amount Paid:</span>
                      <span className="text-white font-medium">₹{getPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Booking ID:</span>
                      <span className="text-white font-medium">BN{Math.floor(Math.random() * 10000)}</span>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/" 
                  className="bg-bollywood-red text-white px-6 py-3 rounded-lg inline-block hover:bg-opacity-90 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            )}
            
            {/* Button */}
            {currentStep !== 'confirm' && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-bollywood-red text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  {currentStep === 'payment' ? 'Complete Payment' : 'Continue'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Checkout;
