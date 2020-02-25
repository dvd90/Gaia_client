import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEvent, deleteEvent } from "../../actions/event";
import { useParams, Link, useHistory } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import swal from "sweetalert";
import axios from "axios";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";

const ShowEvent = ({
  getEvent,
  event,
  isMyEvent,
  deleteEvent,
  user,
  isJoinedEvent
}) => {
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    if (user) {
      getEvent(user._id, id);
    }
  }, [getEvent, id, user]);

  const onClickJoin = e => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Do you want to join this Event?",
      buttons: true
    }).then(async willJoin => {
      if (willJoin) {
        const config = {
          headers: {
            "x-auth-token": localStorage.token
          }
        };
        try {
          const res = await axios.put(
            `https://gaia-mern-app.herokuapp.com/api/events/${id}/join`,
            config
          );
          console.log(res.data);
        } catch (err) {
          console.log(err.response.data);
        }
        swal("Great! See you at the Event ❤️");
        history.push(`/my_events`);
      } else {
        swal("Are you a Chicken... 🐣");
      }
    });
  };

  const onDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Event!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Poof! Your Event has been deleted!", {
          icon: "success"
        });
        try {
          deleteEvent(id);
          history.push(`/my_events`);
        } catch (err) {
          console.log(err.response.data);
        }
      } else {
        swal("Your Event is safe!");
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="show-container">
        <div className="show-banner">
          <img
            src="https://i.ibb.co/GJnkbWN/aranxa-esteve-S5-DEUg2y-UVU-unsplash.jpg"
            alt="veeterzy-s-MQi-L-2v4vs-unsplash"
            border="0"
          />
        </div>
        {event && (
          <>
            <div className="show-title">
              <h2>{event.title}</h2>
            </div>
            <div className="show-points">
              <p className="show-description">
                <i className="far fa-clock"> </i>{" "}
                {moment(event.starts_at).fromNow()}
              </p>
              <p className="show-description">
                <i className="fas fa-map-pin"></i> {event.location}
              </p>
              <p className="show-description">{event.description}</p>
            </div>
            <div className="show-btns">
              {!isJoinedEvent && (
                <Link to="/#!">
                  <Button
                    className="radiant-green-btn show-btn"
                    onClick={e => onClickJoin(e)}
                  >
                    Join
                  </Button>
                </Link>
              )}
              {!isJoinedEvent && (
                <Link to="/events">
                  <Button className="radiant-purple-btn show-btn">Back</Button>
                </Link>
              )}
              {isJoinedEvent && (
                <Link to="/events">
                  <Button className="radiant-purple-btn center-button">
                    Back
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {isMyEvent && (
        <div className="createdIcons">
          <Link to={`/edit_event/${id}`}>
            <EditIcon style={{ fontSize: 60, fill: "black" }} />
          </Link>
          <DeleteIcon
            style={{ fontSize: 60, fill: "#FD5842" }}
            onClick={onDelete}
          />
        </div>
      )}
    </>
  );
};

ShowEvent.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object,
  deleteEvent: PropTypes.func.isRequired,
  isMyEvent: PropTypes.bool,
  isJoinedEvent: PropTypes.bool
};

const mapStateToProps = state => ({
  event: state.event.event,
  user: state.auth.user,
  isMyEvent: state.event.isMyEvent,
  isJoinedEvent: state.event.isJoinedEvent
});

export default connect(mapStateToProps, { getEvent, deleteEvent })(ShowEvent);
