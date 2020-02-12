import axios from "axios";
// import { setAlert } from "./alert";
import {
  CHALLENGES_ERROR,
  GET_ALL_CHALLENGES,
  GET_CHALLENGE,
  GET_MY_CHALLENGES
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

// Load All My Challenges
export const getAllMyChallenges = user_id => async dispatch => {
  try {
    const res = await axios.get(
      `https://gaia-mern-app.herokuapp.com/api/challenges`
    );

    const created = res.data.filter(
      challenge => challenge.creator._id === user_id
    );

    let opened = [];

    res.data.forEach(challenge =>
      challenge.joined_by.forEach(join => {
        if (join.user === user_id && join.status === "In Progress") {
          opened.push(challenge);
        }
      })
    );

    let completed = [];

    res.data.forEach(challenge =>
      challenge.joined_by.forEach(join => {
        if (join.user === user_id && join.status === "Completed") {
          completed.push(challenge);
        }
      })
    );

    const myChallenges = { created, opened, completed };

    dispatch({
      type: GET_MY_CHALLENGES,
      payload: myChallenges
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
