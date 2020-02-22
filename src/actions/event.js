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

    const all = res.data;
    const created = all.filter(event => event.creator._id === user_id);

    let joined = [];
    all.forEach(event =>
      event.attendees.forEach(attend => {
        if (attend.user === user_id) {
          joined.push(event);
        }
      })
    );

    dispatch({
      type: GET_MY_EVENTS,
      payload: [all, created, joined]
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

    const joined = res.data.attendees.filter(event => event.user === user_id);
    if (joined.length > 0) {
      eventInfo.isJoinedEvent = true;
    } else {
      eventInfo.isJoinedEvent = false;
    }
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
