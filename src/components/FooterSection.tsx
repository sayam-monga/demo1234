
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="bg-bollywood-dark-accent py-12 px-4 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="lg:col-span-1">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white flex items-center"
            >
              <span className="text-bollywood-red mr-1">B</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">olly</span>
              <span className="text-bollywood-red">Nights</span>
            </Link>
            <p className="text-white/70 mt-4 mb-6">
              Experience the magic of Bollywood with our exclusive parties and events.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white/70 hover:text-bollywood-red transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-white/70 hover:text-bollywood-red transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-white/70 hover:text-bollywood-red transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-white/70 hover:text-bollywood-red transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className="text-white/70 hover:text-bollywood-red transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className="text-white/70 hover:text-bollywood-red transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-white/70 hover:text-bollywood-red transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-white/70 hover:text-bollywood-red transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-bollywood-red mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-white/70">
                  S-Lounge, Model Town, Patiala, Punjab, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-bollywood-red mr-3 flex-shrink-0" size={18} />
                <a 
                  href="tel:+919876543210" 
                  className="text-white/70 hover:text-bollywood-red transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="text-bollywood-red mr-3 flex-shrink-0" size={18} />
                <a 
                  href="mailto:info@bollynights.com" 
                  className="text-white/70 hover:text-bollywood-red transition-colors"
                >
                  info@bollynights.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">Subscribe</h3>
            <p className="text-white/70 mb-4">
              Get updates about upcoming events and special offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-white w-full focus:outline-none focus:border-bollywood-red"
              />
              <button className="bg-bollywood-red text-white px-4 py-2 rounded-r-lg hover:bg-bollywood-red/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} BollyNights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
