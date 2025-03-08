import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterSection";
import { AlertTriangle } from "lucide-react";

const RefundPolicy = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bollywood-red">
            Refund Policy
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our policy regarding ticket refunds for the Bollywood Bash event.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 rounded-lg border border-white/10 p-8 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-8 bg-bollywood-red/10 p-6 rounded-lg border border-bollywood-red/30">
            <AlertTriangle className="w-8 h-8 text-bollywood-red mr-4" />
            <p className="text-lg font-semibold text-white">
              All ticket sales are final and non-refundable.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                No Refund Policy
              </h2>
              <p className="text-white/80">
                We have a strict no-refund policy for all tickets purchased for
                the Bollywood Bash event. Each pass is sold for ₹250 for stag
                (single person) and ₹400 for couples. Once purchased, tickets
                cannot be refunded under any circumstances, including but not
                limited to:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-white/80">
                <li>Inability to attend due to personal reasons</li>
                <li>Change of plans or scheduling conflicts</li>
                <li>Illness or medical emergencies</li>
                <li>Weather conditions</li>
                <li>Dissatisfaction with the event</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                Ticket Transfers
              </h2>
              <p className="text-white/80">
                While we do not offer refunds, tickets are transferable to
                another individual. If you are unable to attend the event, you
                may transfer your ticket to someone else. Please note that it is
                your responsibility to transfer the ticket (including the QR
                code) to the new attendee. The organizers are not responsible
                for facilitating ticket transfers between individuals.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                Event Cancellation
              </h2>
              <p className="text-white/80">
                In the unlikely event that the Bollywood Bash is cancelled
                entirely by the organizers (not postponed or rescheduled), we
                may, at our sole discretion, offer refunds or alternative
                arrangements. This is the only circumstance under which refunds
                might be considered.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                Event Changes
              </h2>
              <p className="text-white/80">
                The organizers reserve the right to make changes to the event
                program, performing artists, venue, or schedule without prior
                notice. Such changes are not grounds for refunds.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                Acknowledgment
              </h2>
              <p className="text-white/80">
                By purchasing a ticket to the Bollywood Bash, you acknowledge
                and agree to this no-refund policy. We recommend ensuring that
                you are able to attend before completing your purchase.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
