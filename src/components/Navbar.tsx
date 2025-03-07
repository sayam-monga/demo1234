
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-4 bg-bollywood-dark/90 backdrop-blur-lg shadow-md" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold text-white flex items-center"
          >
            <span className="text-bollywood-red mr-1">B</span>
            <span className="bg-clip-text bg-gradient-to-r from-white to-white/80">olly</span>
            <span className="text-bollywood-red">Nights</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/90 hover:text-bollywood-red transition-colors duration-300">
              Home
            </Link>
            <Link to="/events" className="text-white/90 hover:text-bollywood-red transition-colors duration-300">
              Events
            </Link>
            <Link to="/gallery" className="text-white/90 hover:text-bollywood-red transition-colors duration-300">
              Gallery
            </Link>
            <Link to="/about" className="text-white/90 hover:text-bollywood-red transition-colors duration-300">
              About
            </Link>
            <Link 
              to="/checkout" 
              className="bg-bollywood-red text-white px-4 py-2 rounded-lg hover:bg-bollywood-red/90 transition-all duration-300"
            >
              Get Tickets
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-bollywood-dark-accent/95 backdrop-blur-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[300px] py-4 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-white/90 hover:text-bollywood-red transition-colors duration-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/events" 
            className="text-white/90 hover:text-bollywood-red transition-colors duration-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>
          <Link 
            to="/gallery" 
            className="text-white/90 hover:text-bollywood-red transition-colors duration-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link 
            to="/about" 
            className="text-white/90 hover:text-bollywood-red transition-colors duration-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/checkout" 
            className="bg-bollywood-red text-white px-4 py-2 rounded-lg hover:bg-bollywood-red/90 transition-all duration-300 inline-block w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
