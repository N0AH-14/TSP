import axios from "axios";

// API Base URL
export const API_URL = "http://localhost:5001/takeyourticket"; // Update this to the actual deployment URL if needed

// Email for the organizer
// Update with the correct email as required

// Fetch event data based on organizer's email
export const fetchEventData = async (organizerEmail) => {
  let events = []; // Default to an empty array if fetching fails

  try {
    const response = await fetch(`${API_URL}/eventsbyemail/${organizerEmail}`);
    if (!response.ok) throw new Error("Failed to fetch event data");

    events = await response.json();
    console.log("Event data fetched:", events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  // Return formatted events with a delay (simulate network latency)
  return new Promise((resolve) => {
    setTimeout(() => {
      if (events.data && Array.isArray(events.data)) {
        const formattedEvents = events.data.map((event) => ({
          id: event.id,
          name: event.event_name,
          date: new Date(event.date_time).toLocaleDateString(), // Format date
        }));
        resolve({ events: formattedEvents });
      } else {
        resolve({ events: [] }); // Return an empty array if `data` is not an array
      }
    }, 500);
  });
};

// Fetch sales data for a specific event
export const fetchSalesData = async (organizerEmail) => {
  const response = await fetch(
    `http://localhost:5001/takeyourticket/findticketdetailsbyemail/${organizerEmail}`
  );
  const apiData = await response.json();

  // If there are no tickets, return empty data
  if (!apiData.tickets || apiData.tickets.length === 0) {
    return {
      ticketsSold: 0,
      revenue: 0,
      engagementRate: "",
      dates: [],
      data: [],
      traffic: [], // Keep empty traffic if not available
    };
  }

  // Calculate the total tickets sold and total revenue
  const ticketsSold = apiData.tickets.length;
  const revenue = apiData.tickets.reduce(
    (sum, ticket) => sum + (parseFloat(ticket.total_amount) || 0),
    0
  );

  // Group tickets by creation date
  const dailyTicketCount = {};
  apiData.tickets.forEach((ticket) => {
    const date = ticket.ticket_created_at.split("T")[0]; // Extract the date (YYYY-MM-DD)
    dailyTicketCount[date] = (dailyTicketCount[date] || 0) + 1;
  });

  // Prepare the days and data arrays for the frontend
  const dates = Object.keys(dailyTicketCount); // List of unique dates
  const data = Object.values(dailyTicketCount); // Corresponding ticket counts for each date

  // Return the formatted sales data
  return {
    ticketsSold,
    revenue: revenue.toFixed(2), // Ensure 2 decimal places
    engagementRate: "", // Placeholder
    dates, // List of dates
    data, // Tickets generated per date
    traffic: [], // Placeholder for traffic data (if needed)
  };
};

// Fetch user activity data for a specific event
export const fetchUserActivityData = async (eventId) => {
  try {
    const response = await axios.get(
      `${API_URL}/findticketalldetials/${eventId}`
    );
    const tickets = response.data.tickets;

    const userData = tickets.map((ticket) => ({
      Username: ticket.username,
      ticket_id: ticket.ticket_sales_id,
      date_of_booking: new Date(ticket.ticket_created_at).toLocaleString(), // Formatting booking date
      amount: ticket.total_amount,
    }));

    return userData;
  } catch (error) {
    console.error("Error fetching user activity data:", error);
    return []; // Return an empty array if there is an error
  }
};
