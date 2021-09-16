import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = ({isLoaded}) => {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
      {/* <div className="headerContainer">
        <a href="/">Forevernote</a>
      </div> */}
      <div className="sideBarContainer">
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/notes">
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/notebooks">
            Notebooks
          </NavLink>
        </li>
        <li>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div></>

  );
};
export default Navigation;
