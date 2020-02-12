import {
  EVENTS_ERROR,
  GET_ALL_EVENTS,
  GET_MY_EVENTS,
  GET_EVENT
} from "../actions/types";

const initialState = {
  event: null,
  events: [],
  eventJoined: [],
  eventCreated: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false
      };
    case GET_MY_EVENTS:
      return {
        ...state,
        eventJoined: payload.joined,
        eventCreated: payload.created,
        loading: false
      };
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
