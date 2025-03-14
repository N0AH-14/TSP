// // src/store/eventStore.js
import { thunk } from "redux-thunk";

import { createStore, applyMiddleware, combineReducers } from "redux";
import eventReducer from "../reducers/eventReducers";
import authReducer from "../reducers/authReducer";
// import { thunk } from "redux-thunk"; // Ensure this is a default import

// Combine your reducers
const rootReducer = combineReducers({
  events: eventReducer,
  auth: authReducer,
});

// Create the Redux store with thunk middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Middleware for asynchronous actions
);

export default store;
