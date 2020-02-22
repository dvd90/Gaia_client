import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import EventCard from "../layout/EventCard";
import { getAllMyEvents } from "../../actions/event";
import moment from "moment";

const MyEvents = ({
  getAllMyEvents,
  events,
  user,
  eventCreated,
  eventJoined
}) => {
  useEffect(() => {
    if (user) {
      getAllMyEvents(user._id);
    }
  }, [getAllMyEvents, user]);

  const [tab, setTab] = useState(1);
  const [tabCreated, setTabCreated] = useState("selected");
  const [tabFuture, setTabFuture] = useState("");
  const [tabPast, setTabPast] = useState("");

  const onTabMenuClick = e => {
    if (e === 1) {
      setTabCreated("selected");
      setTabFuture("");
      setTabPast("");
    } else if (e === 2) {
      setTabCreated("");
      setTabFuture("selected");
      setTabPast("");
    } else {
      setTabCreated("");
      setTabFuture("");
      setTabPast("selected");
    }
    setTab(e);
  };

  const makeListEvents = events => {
    if (events.length > 0) {
      return (
        <Fragment>
          {events.map(event => (
            <EventCard component={event} key={event._id} />
          ))}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="header-challenges">
          <h3>Sorry you didn't create any Event...</h3>
        </div>
      </Fragment>
    );
  };

  const makeListFuture = events => {
    if (events.length > 0) {
      return (
        <Fragment>
          {events
            .filter(e => moment(e.ends_at).fromNow()[0] === "i")
            .map(event => (
              <EventCard component={event} key={event._id} />
            ))}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="header-challenges">
          <h3>Sorry you didn't join any future Event...</h3>
        </div>
      </Fragment>
    );
  };

  const makeListPast = events => {
    if (events.length > 0) {
      return (
        <Fragment>
          {events
            .filter(e => moment(e.ends_at).fromNow()[0] !== "i")
            .map(event => (
              <EventCard component={event} key={event._id} />
            ))}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="header-challenges">
          <h3>Sorry you didn't join any Past Event...</h3>
        </div>
      </Fragment>
    );
  };

  const listTabCreated = makeListEvents(eventCreated);
  const listTabFuture = makeListFuture(eventJoined);
  const listTabPast = makeListPast(eventJoined);

  return (
    <Fragment>
      <Navbar /> <div className="nav-margin"></div>
      <div className="header-challenges">
        <h3>My Events</h3>
      </div>
      <div className="events-tabs">
        <div className={`tab-link tab-link-challenge ${tabCreated}`}>
          <Link to="#!" onClick={e => onTabMenuClick(1)}>
            Created
          </Link>
        </div>
        <div className={`tab-link tab-link-challenge ${tabFuture}`}>
          <Link to="#!" onClick={e => onTabMenuClick(2)}>
            Future
          </Link>
        </div>
        <div className={`tab-link tab-link-challenge ${tabPast}`}>
          <Link to="#!" onClick={e => onTabMenuClick(3)}>
            Past
          </Link>
        </div>
      </div>
      {tab === 1 && listTabCreated}
      {tab === 2 && listTabFuture}
      {tab === 3 && listTabPast}
    </Fragment>
  );
};

MyEvents.propTypes = {
  getAllMyEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  events: state.event.events,
  eventJoined: state.event.eventJoined,
  eventCreated: state.event.eventCreated,
  user: state.auth.user
});

export default connect(mapStateToProps, { getAllMyEvents })(MyEvents);
