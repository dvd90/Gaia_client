import axios from "axios";
// import { setAlert } from "./alert";
import {
  CHALLENGES_ERROR,
  GET_ALL_CHALLENGES,
  GET_CHALLENGE,
  GET_MY_CHALLENGES,
  DELETE_CHALLENGE
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

    const all = res.data.filter(
      challenge =>
        !created.includes(challenge) && !completed.includes(challenge)
    );
    const myChallenges = { all, created, opened, completed };

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
export const getChallenge = (user_id, id) => async dispatch => {
  let challengeInfo = {};
  try {
    const res = await axios.get(
      `https://gaia-mern-app.herokuapp.com/api/challenges/${id}`
    );

    if (res.data.creator === user_id) {
      challengeInfo.isMyChallenge = true;
    } else {
      challengeInfo.isMyChallenge = false;
    }

    const join = res.data.joined_by.filter(j => j.user === user_id);

    if (join.length !== 0) {
      if (join[0].status === "In Progress") {
        challengeInfo.isOpenedChallenge = true;
        challengeInfo.isCompletedChallenge = false;
      } else {
        challengeInfo.isOpenedChallenge = false;
        challengeInfo.isCompletedChallenge = true;
      }
    } else {
      challengeInfo.isOpenedChallenge = false;
      challengeInfo.isCompletedChallenge = false;
    }

    dispatch({
      type: GET_CHALLENGE,
      payload: [res.data, challengeInfo]
    });
  } catch (err) {
    dispatch({
      type: CHALLENGES_ERROR
    });
  }
};

// Delete A Challenge
export const deleteChallenge = id => async dispatch => {
  const config = {
    headers: {
      "x-auth-token": localStorage.token
    }
  };
  try {
    await axios.delete(
      `https://gaia-mern-app.herokuapp.com/api/challenges/${id}`,
      config
    );
    dispatch({
      type: DELETE_CHALLENGE,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: CHALLENGES_ERROR
    });
  }
};
