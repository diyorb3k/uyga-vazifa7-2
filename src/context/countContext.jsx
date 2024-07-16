import { createContext, useReducer } from "react";

const initialState = {
  first: 10,
  second: 20,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        first: state.first + action.payload,
      };
    case "decrement":
      return {
        ...state,
        first: state.first - action.payload,
      };
    case "incrementTwo":
      return {
        ...state,
        second: state.second + action.payload,
      };
    case "decrementTwo":
      return {
        ...state,
        second: state.second - action.payload,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export const CountContext = createContext();

export const CountProvider = ({ children }) => {
  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <CountContext.Provider value={{ count, dispatch }}>
      {children}
    </CountContext.Provider>
  );
};
