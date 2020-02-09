import axios from "axios";
// import { setAlert } from "./alert";
import { EVENTS_ERROR, GET_ALL_EVENTS } from "../actions/types";

// Load All Events
export const getAllEvents = () => async dispatch => {
  try {
    const res = await axios.get(
      "https://gaia-mern-app.herokuapp.com/api/events"
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
