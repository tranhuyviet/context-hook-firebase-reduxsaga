import React, { createContext, useReducer } from "react";
import { posts } from "../reducers/postsReducer";

export const PostsContext = createContext();

const initialState = {
  posts: []
};

export const PostsProvider = props => {
  const [state, dispatch] = useReducer(posts, initialState);
  const value = { state, dispatch };
  return (
    <PostsContext.Provider value={value}>
      {props.children}
    </PostsContext.Provider>
  );
};
