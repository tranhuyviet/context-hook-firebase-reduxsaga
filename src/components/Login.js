import React, { useState, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import firebase from "../firebase/config";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [routeRedirect, setRouteRedirect] = useState(false);

  const { state, dispatch } = useContext(AuthContext);

  const login = async e => {
    e.preventDefault();
    //console.log("login...");
    let response = await firebase.login(email, password);
    if (response.hasOwnProperty("message")) {
      console.log(response.message);
    } else {
      setRouteRedirect(true);
      return dispatch({ type: "LOGIN", payload: response.user });
    }
  };

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form onSubmit={login}>
        <p>Welcome back</p>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
