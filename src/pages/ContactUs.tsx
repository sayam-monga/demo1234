import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContactUs = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon!",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-bollywood-red bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Have questions about the Bollywood Bash event? We're here to help
            you!
          </p>
        </motion.div>

        <div className="flex items-center justify-center">
          {/* Contact Form */}

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-bollywood-red">
              Contact Information
            </h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-bollywood-gold/20 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-bollywood-red" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-white/70">+91 98777 71951</p>
                  <p className="text-white/70">+91 9876320319</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-bollywood-gold/20 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-bollywood-red" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-white/70">aryankansal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-bollywood-gold/20 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-bollywood-red" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Venue</h3>
                  <p className="text-white/70">S-Lounge</p>
                  <p className="text-white/70">Bhupendra Road, Patiala</p>
                  <p className="text-white/70">Punjab, India</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Event Hours</h3>
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <p className="mb-2">
                  <strong>Date:</strong> March 13, 2025
                </p>
                <p className="mb-2">
                  <strong>Time:</strong> 5:30 PM - 11:00 PM
                </p>
                <p>
                  <strong>Dress Code:</strong> Party Wear
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
