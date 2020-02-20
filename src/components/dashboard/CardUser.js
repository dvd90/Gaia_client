import React, { Fragment } from "react";
import PropTypes from "prop-types";

const CardUser = ({ component, opened, completed }) => {
  return (
    <Fragment>
      <div id="card-user">
        <div className="card-user-content">
          {!component ? (
            ""
          ) : (
            <Fragment>
              <h3 className="header-title card-user-title">
                Hey {component.name} you’re doing a great job
              </h3>
              <p className="card-user-item">
                GAIA Points:{" "}
                <span className="nb-card">{component.gaia_points}</span>
              </p>
              <div className="line"></div>
              <p className="card-user-item">
                Planet consuption:{" "}
                <span className="nb-card">{component.planet_consuption}</span>
              </p>
              <div className="line"></div>
              <p className="card-user-item">
                Open Challenges: <span className="nb-card">{opened}</span>
              </p>
              <div className="line"></div>
              <p className="card-user-item">
                Completed Challenges:{" "}
                <span className="nb-card">{completed}</span>
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

CardUser.propTypes = {
  component: PropTypes.object,
  opened: PropTypes.number,
  completed: PropTypes.number
};

export default CardUser;
