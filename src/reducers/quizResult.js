import { QUIZ_SUCCESS, QUIZ_FAIL } from "../actions/types";

const initialState = {
  score: localStorage.getItem("score")
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case QUIZ_SUCCESS:
      localStorage.setItem("score", payload.score);
      return {
        ...state,
        ...payload
      };
    case QUIZ_FAIL:
      localStorage.removeItem("score");
      return {
        ...state
      };
    default:
      return state;
  }
}
