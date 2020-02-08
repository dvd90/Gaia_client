import React, { Fragment } from "react";
import PropTypes from "prop-types";

const CardUser = props => {
  const username = "Gaia";
  return (
    <Fragment>
      <div id="card-user">
        <div className="card-user-content">
          <h3 className="header-title card-user-title">
            Hey {username} you’re doing a great job
          </h3>
          <p className="card-user-item">
            Planet consuption: <span className="nb-card">5</span>
          </p>
          <div className="line"></div>
          <p className="card-user-item">
            Open Challenges: <span className="nb-card"> 5</span>
          </p>
          <div className="line"></div>
          <p className="card-user-item">
            Completed Challenges: <span className="nb-card"> 5</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

CardUser.propTypes = {};

export default CardUser;
