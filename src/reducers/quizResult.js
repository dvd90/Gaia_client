import { QUIZ_SUCCESS, QUIZ_FAIL } from "../actions/types";

const initialState = {
  score: 0
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case QUIZ_SUCCESS:
      console.log({
        ...state,
        ...payload
      });
      return {
        ...state,
        ...payload
      };
    case QUIZ_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
