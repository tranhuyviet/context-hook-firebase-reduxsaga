import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../firebase/config";
import { AuthContext } from "../context/authContext";

const Nav = props => {
  const [userState, setUserState] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    console.log("Nav useEffect");
    firebase.getUserState().then(user => {
      if (user) {
        setUserState(user);
        setUserEmail(user.email);
      }
    });
  });

  const logout = () => {
    firebase.logout();
    setUserState(null);
    setUserEmail("");
    props.history.replace("/login");
    return dispatch({
      type: "LOGOUT",
      payload: {}
    });
  };

  let buttons;
  if (userState != null || state.user.hasOwnProperty("user")) {
    buttons = (
      <>
        <ul>
          <li>{userEmail}</li>
          <li>
            <button className="logout" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      </>
    );
  } else {
    buttons = (
      <>
        <ul>
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
          <li>
            <Link to="/login">LogIn</Link>
          </li>
        </ul>
      </>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">ContextFirebaseApp</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/create">New Post</Link>
          {buttons}
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Nav);
