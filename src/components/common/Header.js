import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle} exact>
        About
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle} exact>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/authors" activeStyle={activeStyle} exact>
        Authors
      </NavLink>
    </nav>
  );
};

export default Header;
