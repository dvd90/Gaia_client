import axios from "axios";
// import { setAlert } from "./alert";
import {
  CHALLENGES_ERROR,
  GET_ALL_CHALLENGES,
  GET_CHALLENGE
} from "../actions/types";

// Load All Challenges
export const getAllChallenges = () => async dispatch => {
  try {
    const res = await axios.get(
      "https://gaia-mern-app.herokuapp.com/api/challenges"
    );

    dispatch({
      type: GET_ALL_CHALLENGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHALLENGES_ERROR
    });
  }
};

// Load A Challenge
export const getChallenge = id => async dispatch => {
  try {
    const res = await axios.get(
      `https://gaia-mern-app.herokuapp.com/api/challenges/${id}`
    );

    dispatch({
      type: GET_CHALLENGE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHALLENGES_ERROR
    });
  }
};
