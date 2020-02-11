import {
  CHALLENGES_ERROR,
  GET_ALL_CHALLENGES,
  GET_CHALLENGE
} from "../actions/types";

const initialState = {
  challenge: null,
  challenges: [],
  challenge_open: [],
  challenge_created: [],
  challenge_completed: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CHALLENGES:
      return {
        ...state,
        challenges: payload,
        loading: false
      };
    case GET_CHALLENGE:
      return {
        ...state,
        challenge: payload,
        loading: false
      };
    case CHALLENGES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
