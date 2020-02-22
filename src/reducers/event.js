import {
  EVENTS_ERROR,
  GET_ALL_EVENTS,
  GET_MY_EVENTS,
  GET_EVENT,
  DELETE_EVENT
} from '../actions/types';

const initialState = {
  event: null,
  isMyEvent: null,
  isJoinedEvent: null,
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
        event: payload[0],
        isMyEvent: payload[1].isMyEvent,
        isJoinedEvent: payload[1].isJoinedEvent,
        loading: false
      };
    case GET_MY_EVENTS:
      return {
        ...state,
        events: payload[0],
        eventCreated: payload[1],
        eventJoined: payload[2],
        loading: false
      };
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case DELETE_EVENT:
      return {
        ...state,
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
