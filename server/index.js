
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const crypto = require('crypto');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Ticket Schema (as part of the booking)
const ticketSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['STAG', 'COUPLE']
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Define Booking Schema
const bookingSchema = new mongoose.Schema({
  tickets: [ticketSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  bookingId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'CONFIRMED', 'USED'],
    default: 'CONFIRMED'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
      payment_capture: 1
    };
    
    const order = await razorpay.orders.create(options);
    
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Verify payment and save booking
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      formData 
    } = req.body;
    
    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');
      
    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }
    
    // Generate a unique booking ID
    const bookingId = 'BN' + Math.floor(Math.random() * 10000);
    
    // Create new booking in database
    const newBooking = new Booking({
      tickets: formData.tickets,
      totalAmount: formData.totalAmount,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      userId: formData.userId,
      paymentId: razorpay_payment_id,
      bookingId: bookingId
    });
    
    await newBooking.save();
    
    res.json({ 
      success: true, 
      booking: newBooking 
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
});

// Get all bookings for a user
app.get('/api/bookings/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ email });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Get all bookings (for testing)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
