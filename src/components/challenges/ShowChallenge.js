import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getChallenge } from "../../actions/challenge";
import { useParams, Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Button from "@material-ui/core/Button";

const ShowChallenge = ({ getChallenge, challenge }) => {
  let { id } = useParams();
  useEffect(() => {
    getChallenge(id);
  }, [getChallenge, id]);

  return (
    <Fragment>
      <Navbar />
      <div className="show-container">
        <div className="show-banner">
          <img
            src="https://i.ibb.co/n64ZNw4/veeterzy-s-MQi-L-2v4vs-unsplash.jpg"
            alt="veeterzy-s-MQi-L-2v4vs-unsplash"
            border="0"
          />
        </div>
        {challenge ? (
          <Fragment>
            <div className="show-title">
              <h2>{challenge.title}</h2>
            </div>
            <div className="show-points">
              Gaia points: {challenge.gaia_points}{" "}
              <i className="fas fa-globe-europe" />
              <p className="show-description">{challenge.description}</p>
              <div className="show-btns">
                <Link to="/#!">
                  <Button className="radiant-green-btn show-btn">Accept</Button>
                </Link>
                <Link to="/challenges">
                  <Button className="radiant-purple-btn show-btn">Back</Button>
                </Link>
              </div>
            </div>
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

ShowChallenge.propTypes = {
  getChallenge: PropTypes.func.isRequired,
  challenge: PropTypes.object
};

const mapStateToProps = state => ({
  challenge: state.challenge.challenge
});

export default connect(mapStateToProps, { getChallenge })(ShowChallenge);
