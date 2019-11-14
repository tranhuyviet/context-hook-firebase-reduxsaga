import React from "react";

//firebase auth reducer
import { firebaseAuth } from "../reducers/authReducer";

export const AuthContext = React.createContext();

const initialState = {
  user: {}
};

export const AuthProvider = props => {
  const [state, dispatch] = React.useReducer(firebaseAuth, initialState);
  const value = { state, dispatch };
  console.log("caccac", state);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
