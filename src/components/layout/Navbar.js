import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import gaiaNav from "../../images/logonav.png";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth }) => {
  const [nav, setNav] = useState(true);
  const history = useHistory();

  const onClickLogout = e => {
    logout();
    history.push(`/`);
  };

  const hamburger = (
    <Toolbar id="gaia-nav">
      <Link to="/dashboard">
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
          <Link to="/dashboard">
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
            <Link to="/dashboard">Home</Link>
          </li>
          <li className="item-menu">
            <Link to="/challenges">Challenges</Link>
          </li>
          <li className="item-menu">
            <Link to="/events">Events</Link>
          </li>

          {auth.isAuthenticated ? (
            <Fragment>
              <li className="item-menu">
                <Link to="/my_events">My Events</Link>
              </li>
              <li className="item-menu lgo-item">
                <Link onClick={e => onClickLogout(e)} to="#!">
                  Log Out
                </Link>
              </li>
            </Fragment>
          ) : (
            <li className="item-menu lgo-item">
              <Link to="/login">Login</Link>
            </li>
          )}
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

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
