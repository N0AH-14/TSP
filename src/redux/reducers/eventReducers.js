import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
} from "../actions/eventActions";

const initialState = {
  loading: false,
  events: [],
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_EVENTS_SUCCESS:
      return { loading: false, events: action.payload, error: null };
    case FETCH_EVENTS_FAILURE:
      return { loading: false, events: [], error: action.error };
    default:
      return state;
  }
};

export default eventReducer;
