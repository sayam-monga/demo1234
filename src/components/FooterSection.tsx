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
    <footer className="bg-bollywood-dark-accent py-12 px-4 border-t border-white/10">
      <div className="container flex flex-col items-center justify-center gap-2">
        <p className="flex items-center gap-1.5 text-sm font-medium text-white/80">
          Made with{" "}
          <Heart className="h-4 w-4 text-red-400" fill="currentColor" /> by
          <span className="font-semibold text-white">SM</span>
        </p>
        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} True Ticket. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
