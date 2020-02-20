import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEvent } from "../../actions/event";
import { useParams, Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Button from "@material-ui/core/Button";

const ShowEvent = ({ getEvent, event }) => {
  let { id } = useParams();
  useEffect(() => {
    getEvent(id);
  }, [getEvent, id]);

  console.log(event);
  return (
    <Fragment>
      <Navbar />
      <div className="show-container">
        <div className="show-banner">
          <img
            src="https://i.ibb.co/GJnkbWN/aranxa-esteve-S5-DEUg2y-UVU-unsplash.jpg"
            alt="veeterzy-s-MQi-L-2v4vs-unsplash"
            border="0"
          />
        </div>
        {event ? (
          <Fragment>
            <div className="show-title">
              <h2>{event.title}</h2>
            </div>
            <div className="show-points">
              <p className="show-description">{event.starts_at}</p>
              <p className="show-description">{event.location}</p>
              <p className="show-description">{event.description}</p>
              <div className="show-btns">
                <Link to="/#!">
                  <Button className="radiant-green-btn show-btn">Join</Button>
                </Link>
                <Link to="/events">
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

ShowEvent.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object
};

const mapStateToProps = state => ({
  event: state.event.event
});

export default connect(mapStateToProps, { getEvent })(ShowEvent);
