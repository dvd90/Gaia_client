import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import gaiaNav from "../../images/logonav.png";

const Navbar = () => {
  const [nav, setNav] = useState(true);

  const hamburger = (
    <Toolbar id="gaia-nav">
      <Link to="#">
        <img src={gaiaNav} alt="gaia-logo-nav" />
      </Link>
      <div className="nav-hamburger">
        <i
          id="hamburger"
          className="fas fa-bars"
          onClick={e => onNavMenuClick(e)}
        ></i>
      </div>
    </Toolbar>
  );

  const menu = (
    <Toolbar id="gaia-nav-open">
      <div className="nav-hamburger">
        <div className="logo-nav-open">
          <Link to="#">
            <img src={gaiaNav} alt="gaia-logo-nav" />
          </Link>
        </div>
        <div className="x-nav-open">
          <i
            id="x-btn"
            className="fas fa-times"
            onClick={e => onNavMenuClick(e)}
          ></i>
        </div>
      </div>
      <div className="nav-menu">
        <ul id="menu-open-nav">
          <li className="item-menu">
            <Link to="/">Home</Link>
          </li>
          <li className="item-menu">
            <Link to="#">Challenges</Link>
          </li>
          <li className="item-menu">
            <Link to="#">Events</Link>
          </li>
          <li className="item-menu">
            <Link to="#">Profile</Link>
          </li>
          <li className="item-menu lgo-item">
            <Link to="#">Log Out</Link>
          </li>
        </ul>
      </div>
    </Toolbar>
  );

  const onNavMenuClick = e => {
    setNav(!nav);
  };

  return (
    <Fragment>
      <AppBar position="fixed">{nav ? hamburger : menu}</AppBar>
    </Fragment>
  );
};

export default Navbar;
