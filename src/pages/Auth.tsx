import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";

// API URL - should be in environment variable in production
const API_URL = "https://true-ticket-api.onrender.com/api";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    // Basic validation
    if (isLogin) {
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all required fields");
        return false;
      }
    } else {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password
      ) {
        toast.error("Please fill in all required fields");
        return false;
      }

      // Phone validation - simple 10-digit check
      if (!/^\d{10}$/.test(formData.phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        return false;
      }

      // Email validation - basic format check
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const endpoint = isLogin ? `${API_URL}/login` : `${API_URL}/register`;

      const response = await axios.post(endpoint, formData);

      if (response.data.token) {
        // Store token and user data in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));

        toast.success(
          isLogin ? "Logged in successfully!" : "Account created successfully!"
        );

        // Redirect based on previous location or to home
        navigate(-1);
      } else {
        toast.error(response.data.message || "Authentication failed");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      const errorMessage =
        error.response?.data?.message ||
        (isLogin
          ? "Login failed. Please try again."
          : "Registration failed. Please try again.");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bollywood-dark flex flex-col">
      <Navbar />

      <div className="flex-grow py-24 px-4">
        <div className="container mx-auto max-w-md">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center text-white/70 hover:text-bollywood-red mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Link>

          <div className="glass-panel p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {isLogin ? "Sign In" : "Create Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-white mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-white mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-white mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-white mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={
                      isLogin ? "Enter your password" : "Create a password"
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-bollywood-red text-white py-3 rounded-lg transition-colors ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-bollywood-red/90"
                }`}
              >
                {loading
                  ? "Processing..."
                  : isLogin
                    ? "Sign In"
                    : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-bollywood-red hover:underline focus:outline-none transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default Auth;
