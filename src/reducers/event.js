import { EVENTS_ERROR, GET_ALL_EVENTS } from "../actions/types";

const initialState = {
  event: null,
  events: [],
  event_open: [],
  event_created: [],
  event_completed: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case EVENTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
