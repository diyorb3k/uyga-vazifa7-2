import { createContext, useReducer } from "react";
export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [blog, dispatch] = useReducer(reducer, initialState);

  return (
    <PostContext.Provider value={{ blog, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
