import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import {
  CalendarDays,
  MapPin,
  Ticket,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Pass {
  _id: string;
  bookingId: string;
  ticketType: "STAG" | "COUPLE";
  quantity: number;
  totalAmount: number;
  name: string;
  email: string;
  phone: string;
  status: "PENDING" | "CONFIRMED" | "USED";
  createdAt: string;
}

const API_URL = "https://true-ticket-api.onrender.com/api";

const MyPasses = () => {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    if (token) {
      fetchPasses(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchPasses = async (token: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/bookings/my-passes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPasses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching passes:", error);
      toast.error("Failed to load your passes");
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bollywood-dark flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-xl text-center max-w-md">
            <AlertTriangle className="w-12 h-12 text-bollywood-red mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Authentication Required
            </h2>
            <p className="text-white/70 mb-6">
              Please sign in to view your passes.
            </p>
            <Link
              to="/auth"
              className="bg-bollywood-red text-white px-6 py-3 rounded-lg inline-block hover:bg-opacity-90 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bollywood-dark flex flex-col">
      <Navbar />

      <div className="flex-grow py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            My Passes
          </h1>

          {loading ? (
            <div className="glass-panel p-8 rounded-xl text-center">
              <div className="animate-pulse">
                <div className="h-6 bg-white/10 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-24 bg-white/10 rounded mb-4"></div>
                <div className="h-24 bg-white/10 rounded mb-4"></div>
              </div>
            </div>
          ) : passes.length === 0 ? (
            <div className="glass-panel p-8 rounded-xl text-center">
              <Ticket className="w-12 h-12 text-bollywood-red mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                No Passes Found
              </h2>
              <p className="text-white/70 mb-6">
                You haven't purchased any passes yet.
              </p>
              <Link
                to="/checkout"
                className="bg-bollywood-red text-white px-6 py-3 rounded-lg inline-block hover:bg-opacity-90 transition-colors"
              >
                Get Tickets
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {passes.map((pass) => (
                <div key={pass._id} className="glass-panel p-6 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="mb-1">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            pass.status === "CONFIRMED"
                              ? "bg-green-500/20 text-green-400"
                              : pass.status === "USED"
                                ? "bg-gray-500/20 text-gray-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {pass.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {pass.ticketType} Pass - {pass.quantity}{" "}
                        {pass.quantity > 1 ? "tickets" : "ticket"}
                      </h3>
                      <p className="text-white/70 text-sm">
                        Booking ID: {pass.bookingId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">
                        ₹{pass.totalAmount}
                      </p>
                      <p className="text-white/60 text-xs">
                        Purchased on{" "}
                        {new Date(pass.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <CalendarDays className="text-bollywood-red w-5 h-5 mr-2" />
                        <div>
                          <p className="text-white/60 text-xs">Date</p>
                          <p className="text-white">July 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-bollywood-red w-5 h-5 mr-2" />
                        <div>
                          <p className="text-white/60 text-xs">Time</p>
                          <p className="text-white">9:00 PM onwards</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="text-bollywood-red w-5 h-5 mr-2" />
                        <div>
                          <p className="text-white/60 text-xs">Venue</p>
                          <p className="text-white">S-Lounge, Patiala</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">
                      Contact Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <p className="text-white/70">
                        <span className="text-white/50 text-sm block">
                          Name
                        </span>
                        {pass.name}
                      </p>
                      <p className="text-white/70">
                        <span className="text-white/50 text-sm block">
                          Email
                        </span>
                        {pass.email}
                      </p>
                      <p className="text-white/70">
                        <span className="text-white/50 text-sm block">
                          Phone
                        </span>
                        {pass.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default MyPasses;
