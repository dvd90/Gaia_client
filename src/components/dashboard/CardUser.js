import React, { Fragment } from "react";
import PropTypes from "prop-types";

const CardUser = ({ component }) => {
  let renderCard = "";
  if (component) {
    const { name, planet_consuption, gaia_points } = component;
    renderCard = (
      <Fragment>
        {" "}
        <h3 className="header-title card-user-title">
          Hey {name} you’re doing a great job
        </h3>
        <p className="card-user-item">
          GAIA Points: <span className="nb-card">{gaia_points}</span>
        </p>
        <div className="line"></div>
        <p className="card-user-item">
          Planet consuption:{" "}
          <span className="nb-card">{planet_consuption}</span>
        </p>
        <div className="line"></div>
        <p className="card-user-item">
          Open Challenges: <span className="nb-card">TODO</span>
        </p>
        <div className="line"></div>
        <p className="card-user-item">
          Completed Challenges: <span className="nb-card">TODO</span>
        </p>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div id="card-user">
        <div className="card-user-content">{renderCard}</div>
      </div>
    </Fragment>
  );
};

CardUser.propTypes = {
  component: PropTypes.object
  // nbc: PropTypes.number
};

// CardUser.propTypes = {};

export default CardUser;
