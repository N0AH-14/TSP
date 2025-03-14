import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import EventDetails from "../compo/Event_oganiser_form_component/EventDetails";
import MediaUpload from "../compo/Event_oganiser_form_component/MediaUpload";
import VenueDetails from "../compo/Event_oganiser_form_component/VenueDetails";
import SeatingDetails from "../compo/Event_oganiser_form_component/SeatingDetails";
import TagDetails from "../compo/Event_oganiser_form_component/TagDetails";

const EventOrganiseForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || { email: "No email provided" };

  const [step, setStep] = useState(1);
  const [eventId, setEventId] = useState(null);

  const [eventData, setEventData] = useState({
    organizer_email: email,
    description: "",
    starts_at: "",
    ends_at: "",
    event_name: "",
    city: "",
  });
  const [mediaData, setMediaData] = useState({ type: "", mediaFiles: [] });
  const [venueData, setVenueData] = useState({
    venue_name: "",
    street_address: "",
    map_url: "",
    max_capacity: ""
  });
  const [seatingData, setSeatingData] = useState({
    type: "",
    categories: []
  });
  const [tagData, setTagData] = useState({
    event_name: '',
    tag_names: []
  });

  // Load local storage data on initial load
  useEffect(() => {
    const loadData = () => {
      const storedData = {
        eventData: localStorage.getItem("eventData"),
        mediaData: localStorage.getItem("mediaData"),
        venueData: localStorage.getItem("venueData"),
        seatingData: localStorage.getItem("seatingData"),
        tagData: localStorage.getItem("tagData")
      };

      if (storedData.eventData) setEventData(JSON.parse(storedData.eventData));
      if (storedData.mediaData) setMediaData(JSON.parse(storedData.mediaData));
      if (storedData.venueData) setVenueData(JSON.parse(storedData.venueData));
      if (storedData.seatingData) setSeatingData(JSON.parse(storedData.seatingData));
      if (storedData.tagData) setTagData(JSON.parse(storedData.tagData));
    };

    loadData();
  }, []);

  // Navigate back
  const handleBack = () => {
    if (step === 1) {
      navigate("/Dashboard", { state: { email } });
    } else {
      setStep((prevStep) => prevStep - 1);
    }
  };

  // Create Event API call
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.event_name || !eventData.starts_at || !eventData.ends_at || !eventData.city) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5001/takeyourticket/events", {
        ...eventData,
        date_time: new Date().toISOString(),
      });
      setEventId(response.data.id);
      setStep(2);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  // Final submission
  const handleFinalSubmit = async () => {
    try {
      const formData = new FormData();

      // Handle media files upload if available
      if (Array.isArray(mediaData.mediaFiles) && mediaData.mediaFiles.length > 0) {
        mediaData.mediaFiles.forEach((file) => {
          formData.append("media", file);
        });
        formData.append("type", mediaData.type || "");
        await axios.post(`http://localhost:5001/takeyourticket/events/${eventId}/media`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      // Post other event data (venue, seating, tags)
      await Promise.all([
        venueData.venue_name && axios.post(`http://localhost:5001/takeyourticket/events/${eventId}/venue`, venueData),
        
        seatingData.type && seatingData.categories.length > 0 &&
        axios.post(`http://localhost:5001/takeyourticket/events/${eventId}/seating`, seatingData),
        
        tagData.event_name && tagData.tag_names.length > 0 &&
        axios.post(`http://localhost:5001/takeyourticket/events/${eventId}/tags`, tagData)
      ]);

      alert("Event organized successfully!");
      localStorage.clear();
      navigate("/Dashboard", { state: { email } });
    } catch (error) {
      console.error("Error during final submission:", error);
      alert("Error submitting event. Please check all fields and try again.");
    }
  };

  // Store data to local storage on step 6
  useEffect(() => {
    const storeData = () => {
      if (step === 6) {
        localStorage.setItem("eventData", JSON.stringify(eventData));
        localStorage.setItem("mediaData", JSON.stringify(mediaData));
        localStorage.setItem("venueData", JSON.stringify(venueData));
        localStorage.setItem("seatingData", JSON.stringify(seatingData));
        localStorage.setItem("tagData", JSON.stringify(tagData));
      }
    };

    storeData();
  }, [step, eventData, mediaData, venueData, seatingData, tagData]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-[#7b2b41] mb-6">Organize Your Event</h1>
        <h2 className="text-center">{email}</h2>

        {step === 1 && <EventDetails eventData={eventData} setEventData={setEventData} handleEventSubmit={handleEventSubmit} />}
        {step === 2 && <MediaUpload mediaData={mediaData} setMediaData={setMediaData} setStep={setStep} />}
        {step === 3 && <VenueDetails venueData={venueData} setVenueData={setVenueData} setStep={setStep} />}
        {step === 4 && <SeatingDetails seatingData={seatingData} setSeatingData={setSeatingData} setStep={setStep} />}
        {step === 6 && <TagDetails tagData={tagData} setTagData={setTagData} handleFinalSubmit={handleFinalSubmit} />}
        
        <div className="flex justify-between mt-6">
          <button onClick={handleBack} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">Back</button>
          {step < 6 && (
            <button onClick={() => setStep((prevStep) => prevStep + 1)} className="px-4 py-2 bg-[#7b2b41] text-white rounded-lg hover:bg-[#9c4e64] transition">Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventOrganiseForm;
