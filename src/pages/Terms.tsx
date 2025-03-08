import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterSection";

const Terms = () => {
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
            Terms & Conditions
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before purchasing
            tickets to the Bollywood Bash event.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 rounded-lg border border-white/10 p-8 max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                1. Event Details
              </h2>
              <p className="text-white/80">
                The Bollywood Bash event (the "Event") will be held at S-Lounge,
                Patiala on March 13, 2025. The Event will start at 5:30 PM and
                is scheduled to end at approximately 11:00 PM. The organizers
                reserve the right to make changes to the schedule, venue, or any
                other aspect of the Event if necessary.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                2. Ticket Purchase
              </h2>
              <p className="text-white/80">
                All ticket purchases are final and non-refundable. Tickets are
                sold at ₹250 for stag (single person) and ₹400 for couples. By
                purchasing a ticket, you acknowledge and agree to these terms.
                Tickets are transferable but cannot be resold for commercial
                purposes. The organizers reserve the right to refuse entry if
                tickets have been resold.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                3. Entry & Security
              </h2>
              <p className="text-white/80">
                Each ticket holder must present a valid QR code at the entrance
                for verification. Entry may be refused if the ticket cannot be
                verified or is found to be counterfeit. The organizers reserve
                the right to conduct security checks upon entry. Prohibited
                items include weapons, illegal substances, outside food and
                beverages, and professional recording equipment. The organizers
                reserve the right to refuse entry or eject any person causing a
                disturbance or violating these terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                4. Age Restrictions
              </h2>
              <p className="text-white/80">
                The Event is restricted to individuals 18 years of age and
                older. Valid photo identification may be required upon entry.
                Failure to provide valid identification may result in refused
                entry without a refund.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                5. Code of Conduct
              </h2>
              <p className="text-white/80">
                Attendees are expected to behave in a respectful and appropriate
                manner. Harassment, discrimination, or behavior that disrupts
                the enjoyment of others will not be tolerated. The organizers
                reserve the right to remove any individual who violates this
                code of conduct without providing a refund.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                6. Photography & Recording
              </h2>
              <p className="text-white/80">
                By attending the Event, you consent to being photographed,
                filmed, or recorded. These materials may be used for promotional
                purposes by the organizers without compensation or credit.
                Professional recording equipment is not permitted without prior
                written consent from the organizers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                7. Liability
              </h2>
              <p className="text-white/80">
                The organizers are not responsible for any personal injury,
                property loss, or damage incurred during the Event. Attendees
                assume all risks associated with attending the Event. In case of
                cancellation or rescheduling due to unforeseen circumstances,
                the organizers' liability is limited to the face value of the
                ticket.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-bollywood-red">
                8. Changes to Terms
              </h2>
              <p className="text-white/80">
                The organizers reserve the right to modify these terms and
                conditions at any time. Updated terms will be posted on the
                official website and will be effective immediately upon posting.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
