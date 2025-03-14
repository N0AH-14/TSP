import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useNavigate,useLocation } from 'react-router-dom';
import {
  fetchEventData,
  fetchSalesData,
  fetchUserActivityData,
} from './constant';
 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 
// Header Component
function Header({ events, selectedEvent, onSelectEvent, lastUpdated }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md rounded-lg">
      <div className="flex items-center space-x-8">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white bg-blue-800/40 px-3 py-2 rounded-full shadow-lg hover:bg-blue-800/60 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Go Back</span>
        </button>
        {/* Dashboard Title */}
        <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-md">
          Dashboard
        </h1>
      </div>
      <div className="flex space-x-10 items-center">
        {/* Event Dropdown */}
        <div className="relative">
          <select
            value={selectedEvent}
            onChange={(e) => onSelectEvent(e.target.value)}
            className="appearance-none px-5 py-2 pr-10 rounded-md border-none shadow-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {/* Last Updated & Current Time */}
        <div className="flex flex-col text-white text-base items-end">
          <div className="flex items-center space-x-2">
            <p className="font-medium">
              Last Updated: <span className="font-bold">{lastUpdated}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <p className="font-medium">{currentTime.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// Stats Overview Component
function StatsOverview({ stats }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-lg font-medium text-gray-600">Total Events</h3>
        <p className="text-2xl font-bold text-gray-800">{stats.totalEvents}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-lg font-medium text-gray-600">Tickets Sold</h3>
        <p className="text-2xl font-bold text-gray-800">{stats.ticketsSold}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-lg font-medium text-gray-600">Revenue</h3>
        <p className="text-2xl font-bold text-gray-800">{stats.revenue}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-lg font-medium text-gray-600">Engagement Rate</h3>
        <p className="text-2xl font-bold text-gray-800">{stats.engagementRate}%</p>
      </div>
    </section>
  );
}

function DashboardCharts({ salesData, trafficData }) {
  // Log the incoming data for debugging purposes
  console.log("Sales data is:", salesData);
  console.log("Traffic data is:", trafficData);

  // Ensure that the data for both charts is available and correctly formatted
  if (
    !salesData ||
    !Array.isArray(salesData.labels) ||
    salesData.labels.length === 0
  ) {
    return <p>Loading sales data...</p>;
  }

  if (
    !trafficData ||
    !Array.isArray(trafficData.labels) ||
    trafficData.labels.length === 0
  ) {
    return <p>Loading traffic data...</p>;
  }

  // Prepare data for the Sales chart with additional customization
  const salesChartData = {
    labels: salesData.labels || [],
    datasets: [
      {
        label: 'Sales (Rs)',
        data: salesData.datasets?.[0]?.data || [],
        backgroundColor: 'rgba(79, 70, 229, 0.2)', // Transparent fill color
        borderColor: '#4f46e5', // Line color
        borderWidth: 2,
        fill: true, // Fill under the line
        pointBackgroundColor: '#4f46e5', // Color for points
        pointHoverRadius: 6, // Larger points on hover
        pointHoverBackgroundColor: '#3730a3', // Darker shade on hover
        tension: 0.4, // Smooth line curve
      },
    ],
  };

  // Prepare data for the Traffic chart with additional customization (converted to line graph)
  const trafficChartData = {
    labels:  [22-10,23-10,24-10,25-10,26,10,27-10,28-10,29-10,30-10,31-10],
    datasets: [
      {
        label: 'Traffic',
        data: [10,11,6,3,11,14,15,6,12,4],
        backgroundColor: 'rgba(96, 165, 250, 0.2)', // Transparent fill color
        borderColor: '#60a5fa', // Line color
        borderWidth: 2,
        fill: true, // Fill under the line
        pointBackgroundColor: '#60a5fa', // Color for points
        pointHoverRadius: 6, // Larger points on hover
        pointHoverBackgroundColor: '#2563eb', // Darker shade on hover
        tension: 0.4, // Smooth line curve
      },
    ],
  };

  // Custom chart options to enhance appearance
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Show legend
        position: 'top', // Place legend at the top
        labels: {
          font: {
            size: 14,
            family: 'Arial',
          },
          color: '#4b5563', // Gray text color
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1f2937', // Dark background for tooltips
        titleColor: '#f9fafb', // Light title text
        bodyColor: '#d1d5db', // Light body text
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          color: '#6b7280', // Gray tick color
        },
      },
      y: {
        grid: {
          color: 'rgba(209, 213, 219, 0.3)', // Light gray grid lines
        },
        ticks: {
          color: '#6b7280', // Gray tick color
        },
      },
    },
  };

  // Render the charts
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Sales Overview</h3>
        <Line data={salesChartData} options={chartOptions} />
      </div>
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Traffic Insights</h3>
        <Line data={trafficChartData} options={chartOptions} />
      </div>
    </section>
  );
}





// User Activity Component
function UserActivity({ users }) {
  // Calculate total tickets and total amount
  const totalTickets = users.length;
  const totalAmount = users.reduce((sum, user) => sum + (parseFloat(user.amount) || 0), 0);

  return (
    <section className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Recent User Activity</h3>
      
      {/* Display Total Tickets and Total Amount */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-700 font-semibold text-lg">
          Total Tickets: <span className="text-gray-900">{totalTickets}</span>
        </div>
        <div className="text-gray-700 font-semibold text-lg">
          Total Amount: <span className="text-gray-900">Rs {totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <table className="w-full text-left table-auto border-collapse bg-gray-50 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-3 font-medium">Username</th>
            <th className="px-4 py-3 font-medium">Ticket ID</th>
            <th className="px-4 py-3 font-medium">Date of Booking</th>
            <th className="px-4 py-3 font-medium">Amount (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-4 py-3 text-gray-800">{user.Username}</td>
              <td className="px-4 py-3 text-gray-800">{user.ticket_id}</td>
              <td className="px-4 py-3 text-gray-800">{user.date_of_booking}</td>
              <td className="px-4 py-3 text-gray-800">Rs {parseFloat(user.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}



// Main Dashboard Component
// Main Dashboard Component
// Main Dashboard Component
function Dashboard() {
  const location = useLocation();
  const email = location.state?.email;

  const [stats, setStats] = useState({
    totalEvents: 0,
    ticketsSold: 0,
    revenue: 0,
    engagementRate: 0,
  });
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [{ label: 'Sales ($)', data: [], backgroundColor: '#4f46e5' }],
  });
  const [trafficData, setTrafficData] = useState({
    labels: [],
    datasets: [{ label: 'Traffic', data: [], backgroundColor: '#60a5fa' }],
  });
  const [userActivity, setUserActivity] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    async function initialize() {
      try {
        const eventData = await fetchEventData(email);
        if (eventData.events && Array.isArray(eventData.events)) {
          setEvents(eventData.events);
          setSelectedEvent(eventData.events[0]?.id || "");
        }
      } catch (error) {
        console.error("Error initializing events:", error);
      }
    }
    initialize();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      async function fetchData() {
        try {
          const sales = await fetchSalesData(email);
          const users = await fetchUserActivityData(selectedEvent);

          setStats({
            totalEvents: events.length,
            ticketsSold: sales.ticketsSold,
            revenue: sales.revenue,
            engagementRate: sales.engagementRate,
          });

          // Use sales.dates for the labels and sales.data for the ticket counts
          setSalesData({
            labels: sales.dates || [],  // Use 'dates' from API for labels
            datasets: [{
              label: 'Tickets Sold',
              data: sales.data || [],  // Corresponding ticket counts
              backgroundColor: '#4f46e5',
            }],
          });

          // Use sales.dates for the labels and sales.traffic for traffic data
          setTrafficData({
            labels: sales.dates || [],  // Use 'dates' from API for labels
            datasets: [{
              label: 'Traffic',
              data: sales.traffic || [],  // Placeholder or actual traffic data
              backgroundColor: '#60a5fa',
            }],
          });

          setUserActivity(users);
          setLastUpdated(new Date().toLocaleString());
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }
  }, [selectedEvent, events, email]);  // Ensure email is included in the dependencies

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        events={events}
        selectedEvent={selectedEvent}
        onSelectEvent={setSelectedEvent}
        lastUpdated={lastUpdated}
      />
      <StatsOverview stats={stats} />
      <DashboardCharts salesData={salesData} trafficData={trafficData} />
      <UserActivity users={userActivity} />
    </div>
  );
}


export default Dashboard;
