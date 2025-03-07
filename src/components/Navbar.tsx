import { useState, useEffect } from "react";
import { Menu, Ticket, TicketIcon, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check if user is logged in
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);

      if (token) {
        try {
          const userData = JSON.parse(localStorage.getItem("userData") || "{}");
          setUserName(userData.name || "");
        } catch (error) {
          console.error("Error parsing user data", error);
        }
      }
    };

    checkLoginStatus();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserName("");
    toast.success("Signed out successfully");
    navigate("/");
  };

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
            <span className="text-bollywood-red mr-1">True</span>
            <span className="bg-clip-text bg-gradient-to-r from-white to-white/80">
              Ticket
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                <Link
                  to="/my-passes"
                  className="text-white/90 hover:text-bollywood-red transition-colors duration-300"
                >
                  My Passes
                </Link>
                <div className="relative group">
                  <button className="text-white/90 hover:text-bollywood-red transition-colors duration-300">
                    {userName || "Account"}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-bollywood-dark-accent/95 backdrop-blur-lg rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-white/90 hover:bg-white/10 hover:text-bollywood-red transition-colors duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-white/90 hover:text-bollywood-red transition-colors duration-300"
              >
                Sign In
              </Link>
            )}

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
          isMenuOpen
            ? "max-h-[400px] py-4 opacity-100"
            : "max-h-0 py-0 opacity-0 overflow-hidden"
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

          {isLoggedIn ? (
            <>
              <Link
                to="/my-passes"
                className="text-white/90 hover:text-bollywood-red transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Passes
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="text-white/90 hover:text-bollywood-red transition-colors duration-300 py-2 text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="text-white/90 hover:text-bollywood-red transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          )}

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
