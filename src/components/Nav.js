import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import { AuthContext } from "../context/authContext";

const Nav = () => {
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
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
