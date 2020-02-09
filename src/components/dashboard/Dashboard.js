import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../layout/Navbar";
import CardUser from "./CardUser";

const Dashboard = ({ isAuthenticated, auth }) => {
  return (
    <Fragment>
      <Navbar />
      {/* Get the user infos */}
      <CardUser component={auth.user} />
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
