
import { useState, useEffect } from 'react';
import { ArrowLeft, Check, AlertCircle, Trash } from 'lucide-react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useUser, SignInButton } from '@clerk/clerk-react';

// Simplified checkout steps
const steps = [
  { id: 'ticket', label: 'Tickets' },
  { id: 'details', label: 'Details' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Confirmation' }
];

// API URL - should be in environment variable in production
const API_URL = 'http://localhost:5000/api';

interface TicketSelection {
  type: 'STAG' | 'COUPLE';
  quantity: number;
  price: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const [currentStep, setCurrentStep] = useState('ticket');
  const [selectedTickets, setSelectedTickets] = useState<TicketSelection[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    termsAccepted: false
  });
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  
  // Initialize from location state if available
  useEffect(() => {
    if (location.state) {
      const { ticketType, quantity, price } = location.state as any;
      if (ticketType && quantity && price) {
        setSelectedTickets([{ type: ticketType, quantity, price }]);
      }
    }

    // Pre-fill form if user is signed in
    if (isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        name: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || ''
      }));
    }
  }, [location.state, isSignedIn, user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addTicket = () => {
    const newTicket: TicketSelection = {
      type: 'STAG',
      quantity: 1,
      price: 250
    };
    setSelectedTickets([...selectedTickets, newTicket]);
  };

  const removeTicket = (index: number) => {
    const updatedTickets = [...selectedTickets];
    updatedTickets.splice(index, 1);
    setSelectedTickets(updatedTickets);
  };

  const updateTicket = (index: number, field: keyof TicketSelection, value: any) => {
    const updatedTickets = [...selectedTickets];
    updatedTickets[index] = {
      ...updatedTickets[index],
      [field]: value,
      // Update price based on type
      price: field === 'type' ? (value === 'STAG' ? 250 : 400) : updatedTickets[index].price
    };
    setSelectedTickets(updatedTickets);
  };
  
  // Calculate total price for all tickets
  const getTotalPrice = () => {
    return selectedTickets.reduce((total, ticket) => {
      return total + (ticket.price * ticket.quantity);
    }, 0);
  };
  
  const initiateRazorpayPayment = async () => {
    try {
      setLoading(true);
      
      // Create order on server
      const orderResponse = await axios.post(`${API_URL}/create-order`, {
        amount: getTotalPrice()
      });
      
      const options = {
        key: 'rzp_test_your_key_here', // Replace with your Razorpay key ID
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: 'Bollywood Night',
        description: `Tickets: ${selectedTickets.map(t => `${t.type} x ${t.quantity}`).join(', ')}`,
        order_id: orderResponse.data.id,
        handler: async function (response: any) {
          try {
            // Verify payment with server
            const verifyResponse = await axios.post(`${API_URL}/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              formData: {
                ...formData,
                tickets: selectedTickets,
                totalAmount: getTotalPrice(),
                userId: user?.id
              }
            });
            
            if (verifyResponse.data.success) {
              setBookingDetails(verifyResponse.data.booking);
              setCurrentStep('confirm');
              toast.success("Payment processed successfully!");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#E63946'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast.error("Payment cancelled");
          }
        }
      };
      
      // Initialize Razorpay
      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
      
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };
  
  const handleNext = () => {
    if (!isSignedIn && currentStep === 'ticket') {
      toast.error("Please sign in to continue with checkout");
      return;
    }

    let nextStep = '';
    
    switch (currentStep) {
      case 'ticket':
        if (selectedTickets.length === 0) {
          toast.error("Please select at least one ticket");
          return;
        }
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
        // Initiate Razorpay payment
        initiateRazorpayPayment();
        return;
      default:
        nextStep = currentStep;
    }
    
    setCurrentStep(nextStep);
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
                
                {!isSignedIn ? (
                  <div className="p-4 bg-white/5 rounded-lg mb-6 text-center">
                    <AlertCircle className="text-bollywood-red mx-auto mb-2" size={24} />
                    <p className="text-white mb-4">Please sign in to purchase tickets</p>
                    <SignInButton mode="modal">
                      <button className="bg-bollywood-red text-white px-4 py-2 rounded-lg hover:bg-bollywood-red/90 transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                  </div>
                ) : (
                  <>
                    {selectedTickets.length === 0 ? (
                      <div className="p-6 border border-dashed border-white/20 rounded-lg mb-6 text-center">
                        <p className="text-white/60 mb-4">No tickets selected</p>
                        <button 
                          onClick={addTicket}
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Add Ticket
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6 mb-6">
                        {selectedTickets.map((ticket, index) => (
                          <div key={index} className="p-4 bg-white/5 rounded-lg relative">
                            <button 
                              className="absolute top-2 right-2 text-white/50 hover:text-bollywood-red transition-colors"
                              onClick={() => removeTicket(index)}
                            >
                              <Trash size={16} />
                            </button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-white mb-2">Ticket Type</label>
                                <select
                                  value={ticket.type}
                                  onChange={(e) => updateTicket(index, 'type', e.target.value)}
                                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                >
                                  <option value="STAG">STAG Entry (₹250)</option>
                                  <option value="COUPLE">COUPLE Entry (₹400)</option>
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-white mb-2">Quantity</label>
                                <select
                                  value={ticket.quantity}
                                  onChange={(e) => updateTicket(index, 'quantity', parseInt(e.target.value))}
                                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                >
                                  {[...Array(10)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                  ))}
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-white mb-2">Subtotal</label>
                                <div className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white">
                                  ₹{ticket.price * ticket.quantity}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <button 
                          onClick={addTicket}
                          className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          + Add Another Ticket
                        </button>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg mb-8">
                      <span className="text-white">Total Amount:</span>
                      <span className="text-2xl font-bold text-white">₹{getTotalPrice()}</span>
                    </div>
                  </>
                )}
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
                      readOnly={!!user?.primaryEmailAddress}
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
                    You'll be redirected to Razorpay to complete your payment securely.
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  {selectedTickets.map((ticket, index) => (
                    <div key={index} className="flex justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white/70">{ticket.type} Ticket:</span>
                      <span className="text-white font-medium">{ticket.quantity} × ₹{ticket.price} = ₹{ticket.quantity * ticket.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white/70">Name:</span>
                    <span className="text-white font-medium">{formData.name}</span>
                  </div>
                  
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white/70">Email:</span>
                    <span className="text-white font-medium">{formData.email}</span>
                  </div>
                  
                  <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white/70">Phone:</span>
                    <span className="text-white font-medium">{formData.phone}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg mb-8">
                  <span className="text-white">Amount to Pay:</span>
                  <span className="text-2xl font-bold text-white">₹{getTotalPrice()}</span>
                </div>
              </div>
            )}
            
            {currentStep === 'confirm' && bookingDetails && (
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
                    {selectedTickets.map((ticket, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-white/70">{ticket.type} Ticket:</span>
                        <span className="text-white font-medium">{ticket.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <span className="text-white/70">Amount Paid:</span>
                      <span className="text-white font-medium">₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Booking ID:</span>
                      <span className="text-white font-medium">
                        {(bookingDetails as any).bookingId || `BN${Math.floor(Math.random() * 10000)}`}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 justify-center">
                  <Link 
                    to="/" 
                    className="bg-white/10 text-white px-6 py-3 rounded-lg inline-block hover:bg-white/20 transition-colors"
                  >
                    Back to Home
                  </Link>
                  <Link 
                    to="/my-passes" 
                    className="bg-bollywood-red text-white px-6 py-3 rounded-lg inline-block hover:bg-opacity-90 transition-colors"
                  >
                    View My Passes
                  </Link>
                </div>
              </div>
            )}
            
            {/* Button */}
            {currentStep !== 'confirm' && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={loading || (currentStep === 'ticket' && (!isSignedIn || selectedTickets.length === 0))}
                  className={`bg-bollywood-red text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors ${
                    (loading || (currentStep === 'ticket' && (!isSignedIn || selectedTickets.length === 0))) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Processing...' : currentStep === 'payment' ? 'Complete Payment' : 'Continue'}
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
