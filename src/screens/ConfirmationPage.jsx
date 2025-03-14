import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: ticket } = location;
  const [expanded, setExpanded] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);


  useEffect(() => {
    // Hide the animation after 2 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!ticket) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Error</h1>
          <p>Ticket information is missing. Please go back and try again.</p>
          <button
            className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg transition mt-4"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const backendBaseUrl = "http://localhost:5001";
  const downloadUrl = ticket.downloadUrl
    ? `${backendBaseUrl}/download-ticket/${encodeURIComponent(ticket.user_id)}/${encodeURIComponent(ticket.downloadUrl.split('/').pop())}`
    : null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        {showAnimation ? (
          <div className="animation-container text-center mb-6">
            <div className="ticket-animation">
              <span className="ticket-confirmed">Ticket Confirmed!</span>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center" style={{ color: "#7b2b41" }}>
              Order Confirmation
            </h1>
            <div className="mb-4">
              <p>
                <strong>Order ID:</strong> #{ticket.ticketId || "N/A"}
              </p>
              <p>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>

            <button
              className="w-full bg-[#7b2b41] hover:bg-[#8c3c52] text-white py-2 rounded-lg transition mb-4"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "View Less" : "View More"}
            </button>

            {expanded && (
              <div className="event-details mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <h2 className="text-2xl font-semibold" style={{ color: "#7b2b41" }}>Event Details</h2>
                <p>
                  <strong>Event:</strong> {ticket.eventName || "N/A"}
                </p>
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {new Date(ticket.eventDate).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    timeZoneName: "short",
                  })}
                </p>
                <p>
                  <strong>Seat Category:</strong> {ticket.seatCategory || "N/A"}
                </p>
                <p>
                  <strong>Venue:</strong> {ticket.venue || "N/A"}
                </p>
              </div>
            )}

            {downloadUrl ? (
              <a
                href={downloadUrl}
                className="block bg-green-500 hover:bg-green-600 text-white py-2 text-center rounded-lg transition mb-4"
                download
              >
                Download Ticket
              </a>
            ) : (
              <p className="text-center text-gray-500">Download link is unavailable.</p>
            )}

            <button
              className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg transition"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;
