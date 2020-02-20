import {
  CHALLENGES_ERROR,
  GET_ALL_CHALLENGES,
  GET_CHALLENGE,
  GET_MY_CHALLENGES,
  DELETE_CHALLENGE,
  CLEAR_CHALLENGES
} from '../actions/types';

const initialState = {
  challenge: null,
  challenges: [],
  challengeOpened: [],
  challengeCreated: [],
  challengeCompleted: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_CHALLENGES:
      return {
        ...state,
        challenges: payload.all,
        challengeCreated: payload.created,
        challengeOpened: payload.opened,
        challengeCompleted: payload.completed,
        loading: false
      };
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
    case DELETE_CHALLENGE:
      return {
        ...state,
        challenge: state.challenge.filter(
          challenge => challenge._id !== action.payload
        ),
        loading: false
      };

    //CLEAR_CHALLENGES

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
