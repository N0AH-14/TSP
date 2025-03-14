// src/reducers/authReducer.js

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "CLEAR_USER":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Action creators
export const setUser = (user) => ({ type: "SET_USER", payload: user });
export const clearUser = () => ({ type: "CLEAR_USER" });

export default authReducer;
