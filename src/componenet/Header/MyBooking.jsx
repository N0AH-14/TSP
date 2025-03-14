import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
// Import the CSS for animations

function MyBooking() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedTickets, setFlippedTickets] = useState({}); // Track flipped state

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const delay = setTimeout(() => {
        const fetchBookings = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5001/takeyourticket/findticketdetailsbyemail/${user.email}`
            );
            setBookings(response.data.tickets || []);
          } catch (error) {
            console.error("Error fetching bookings:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchBookings();
      }, 2000);

      return () => clearTimeout(delay);
    }
  }, [isAuthenticated, user?.email]);

  const handleFlip = (ticketId) => {
    setFlippedTickets((prevState) => ({
      ...prevState,
      [ticketId]: !prevState[ticketId], // Toggle the flip state for the specific ticket
    }));
  };
   if (!isAuthenticated) {
    return <div>Please log in to view your bookings.</div>;
  }

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <iframe
          src="https://lottie.host/embed/8ac7aad8-3f52-4b3a-a424-30f03a038989/N8SKCLC5CL.json"
          style={{
            width: "300px",
            height: "300px",
            border: "none",
          }}
          title="Loading animation"
        ></iframe>
      </div>
    );
  }

 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mt-4 text-center flex justify-center items-center gap-2">
        My Bookings
        <iframe
          src="https://lottie.host/embed/b110c16b-1c59-444e-b02d-4efc7238b0fa/zzIBABvGUQ.json"
          style={{
            width: "40px",
            height: "40px",
            border: "none",
          }}
          title="Running Animation"
        ></iframe>
      </h1>

      {bookings.length === 0 ? (
        <div className="mt-4 text-gray-500">No bookings found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mt-6">
          {bookings.map((booking) => (
            <div
              key={booking.ticket_id}
              className={`relative bg-white border border-gray-300 rounded-lg shadow-md p-4 ticket-style ${
                flippedTickets[booking.ticket_id] ? "flipped" : ""
              }`}
              onClick={(e) => {
                // Prevent flipping when "Download Ticket" button is clicked
                if (e.target.tagName !== "BUTTON") handleFlip(booking.ticket_id);
              }}
            >
              <div className="ticket-inner">
                {/* Front Side */}
                <div className="ticket-front">
                  <div className="flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold mb-2 uppercase">
                      {booking.event_name}
                    </h2>
                    <p className="text-gray-700 mb-2">{booking.venue}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.event_date).toLocaleDateString()}
                    </p>
                    <hr className="my-4 w-full border-dashed border-gray-400" />
                    <p className="text-gray-600 text-sm">
                      <strong>Seat Category:</strong>{" "}
                      {booking.seat_category || "N/A"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Ticket Type:</strong> {booking.ticket_type || "N/A"}
                    </p>
                    <button
                      className="mt-4 bg-green-500 text-white py-2 px-6 rounded-full text-sm hover:bg-green-600"
                      onClick={() =>
                        window.open(
                          `http://localhost:5001${booking.ticket_pdf_url}`,
                          "_blank"
                        )
                      }
                    >
                      Download Ticket
                    </button>
                  </div>
                </div>
       
                {/* <div className="ticket-back">
                  <div className="flex flex-col items-center text-center">
                    <p className="text-gray-700 mb-2">
                      <strong>Order ID:</strong> {booking.order_id}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Transaction ID:</strong> {booking.transaction_id}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Total Amount:</strong> ₹{booking.total_amount}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Ticket Created At:</strong>{" "}
                      {new Date(booking.ticket_created_at).toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                      <strong>Is Used:</strong>{" "}
                      {booking.is_used ? "Yes" : "No"}
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooking;
