import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux"; // Import Redux hooks
import HomeScreen from "./screens/HomeScreen";
import EventDetail from "./screens/eventDetailScreen/EventDetail";
import ProfilePage from "./screens/ProfilePage";
import OTPRequestForm from "./componenet/Organiser/compo/OTPRequestForm";
import OrgHomePage from "./componenet/Organiser/OrgHomePage";
import AuthScreen from "./componenet/Organiser/screens/AuthScreen";
import AccountSetupForm from "./componenet/Organiser/screens/AccountSetupForm";
import OrganiserDashbaord from "./componenet/Organiser/screens/OrganiserDashboard";
import OrganiserDashboard from "./componenet/Organiser/screens/OrganiserDashboard";
import DashboardView from "./componenet/Organiser/compo/DasboardCompo/DashboardView";
import EventOrganiseForm from "./componenet/Organiser/screens/EventOrganiseForm";
import EventStatus from "./componenet/Organiser/screens/EventStatus";
import ConfirmationPage from "./screens/ConfirmationPage";
import Dashboard from "./componenet/Organiser/Dashboard/Dashboard";
import MyBooking from "./componenet/Header/MyBooking";

function App() {
  const user = useSelector((state) => state.auth.user); // Fetch user from Redux store

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/event/:id" element={<EventDetail user={user} />} /> {/* Pass user as prop */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/OTPRequestForm" element={<OTPRequestForm />} />
        <Route path="/OrgHomepage" element={<OrgHomePage></OrgHomePage>}/>
        <Route path="/Authentication" element={<AuthScreen></AuthScreen>}/>
        <Route path="/Accountsetup" element={<AccountSetupForm></AccountSetupForm>}></Route>
        <Route path="/OrganiserDashboard" element={<OrganiserDashboard />} />
        <Route path="/Dashboard" element={<DashboardView></DashboardView>} />
        <Route path="/EventOrganiseForm" element={<EventOrganiseForm></EventOrganiseForm>}></Route>
        <Route path="/Organiser_event_request" element={<EventStatus></EventStatus>} ></Route>
        <Route path="/confirmation" element={<ConfirmationPage></ConfirmationPage>} ></Route>
       <Route path="/real-time-dashborad" element={<Dashboard></Dashboard>}></Route>
       <Route path="/my-booking" element={<MyBooking></MyBooking>}></Route>
</Routes>
</Router>

 );
}

export default App;
