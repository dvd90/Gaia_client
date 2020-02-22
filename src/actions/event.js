import axios from 'axios';
// import { setAlert } from "./alert";
import {
  EVENTS_ERROR,
  GET_ALL_EVENTS,
  GET_MY_EVENTS,
  GET_EVENT,
  DELETE_EVENT
} from '../actions/types';

// Load All Events
export const getAllEvents = () => async dispatch => {
  try {
    const res = await axios.get(
      'https://gaia-mern-app.herokuapp.com/api/events'
    );

    dispatch({
      type: GET_ALL_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR
    });
  }
};

// Load All My Events
export const getAllMyEvents = user_id => async dispatch => {
  try {
    const res = await axios.get(
      `https://gaia-mern-app.herokuapp.com/api/events`
    );

    const created = res.data.filter(event => event.creator._id === user_id);

    let joined = [];
    res.data.forEach(event =>
      event.attendees.forEach(attend => {
        if (attend.user === user_id) {
          joined.push(event);
        }
      })
    );

    const myEvents = { created, joined };

    dispatch({
      type: GET_MY_EVENTS,
      payload: myEvents
    });
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR
    });
  }
};

// Load A Event
export const getEvent = (user_id, id) => async dispatch => {
  let eventInfo = {};

  try {
    const res = await axios.get(
      `https://gaia-mern-app.herokuapp.com/api/events/${id}`
    );

    if (res.data.creator === user_id) {
      eventInfo.isMyEvent = true;
    } else {
      eventInfo.isMyEvent = false;
    }

    dispatch({
      type: GET_EVENT,
      payload: [res.data, eventInfo]
    });
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR
    });
  }
};

// Delete An EVENT
export const deleteEvent = id => async dispatch => {
  const config = {
    headers: {
      'x-auth-token': localStorage.token
    }
  };
  try {
    await axios.delete(
      `https://gaia-mern-app.herokuapp.com/api/events/${id}`,
      config
    );
    dispatch({
      type: DELETE_EVENT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR
    });
  }
};
