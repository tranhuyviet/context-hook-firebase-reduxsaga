import React, { useState, useContext } from "react";
import firebase from "../firebase/config";
import { AuthContext } from "../context/authContext";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [routeRedirect, setRouteRedirect] = useState(false);

  const { state, dispatch } = useContext(AuthContext);

  const signin = async e => {
    e.preventDefault();
    let response = await firebase.signin(email, password);
    if (response.hasOwnProperty("message")) {
      console.log(response.message);
    } else {
      console.log(response.user);
      console.log(response.user.email);
      setRouteRedirect(true);
      return dispatch({
        type: "SIGNIN",
        payload: response.user
      });
    }
  };

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form onSubmit={signin}>
        <p>Create an Account</p>
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

        <input type="submit" value="Create account" />
      </form>
    </>
  );
};

export default Signin;
