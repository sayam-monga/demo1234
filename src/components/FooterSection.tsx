import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <div>
      <footer className="bg-bollywood-dark-accent py-12 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Logo and Info */}

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h3>
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
                    to="/terms"
                    className="text-white/70 hover:text-bollywood-red transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>

                <li>
                  <Link
                    to="/refund"
                    className="text-white/70 hover:text-bollywood-red transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ContactUs"
                    className="text-white/70 hover:text-bollywood-red transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin
                    className="text-bollywood-red mr-3 flex-shrink-0 mt-1"
                    size={18}
                  />
                  <span className="text-white/70">
                    S-Lounge, Model Town, Patiala, Punjab, India
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone
                    className="text-bollywood-red mr-3 flex-shrink-0"
                    size={18}
                  />
                  <a
                    href="tel:+919876543210"
                    className="text-white/70 hover:text-bollywood-red transition-colors"
                  >
                    +91 9876320319
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
          </div>
        </div>
      </footer>
      <footer className="bg-bollywood-dark-accent py-12 px-4 border-t border-white/10">
        <div className="container flex flex-col items-center justify-center gap-2">
          <p className="flex items-center gap-1.5 text-sm font-medium text-white/80">
            Made with{" "}
            <Heart className="h-4 w-4 text-red-400" fill="currentColor" /> by
            <span className="font-semibold text-white">
              {" "}
              <a href="https://www.instagram.com/_sayam.m/">SM</a>
            </span>
          </p>
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} True Ticket. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;
