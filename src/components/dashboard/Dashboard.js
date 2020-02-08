import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Navbar from "../layout/Navbar";
import CardUser from "./CardUser";

const Dashboard = props => {
  return (
    <Fragment>
      <Navbar />
      <CardUser />
    </Fragment>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
