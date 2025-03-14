import axios from "axios";

export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";

export const fetchEvents = (city) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_EVENTS_REQUEST });
    try {
     if(city){
       const response = await axios.get(
         `http://localhost:5001/takeyourticket/events?city=${city}`
       );
       dispatch({ type: FETCH_EVENTS_SUCCESS, payload: response.data });
     } else{
        const response = await axios.get(
          `http://localhost:5001/takeyourticket/allevents`
        );
        dispatch({ type: FETCH_EVENTS_SUCCESS, payload: response.data });
     }
    } catch (error) {
      console.error("Error fetching events:", error);
      dispatch({ type: FETCH_EVENTS_FAILURE, error: error.message });
    }
  };
};

// /takeyourticket/allevents