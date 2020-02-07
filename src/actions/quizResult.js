import axios from "axios";
import { QUIZ_SUCCESS, QUIZ_FAIL } from "./types";

// Call FootPrintAPI with Redux
export const quizResult = ({
  country,
  eater,
  flights,
  transportation
}) => async dispatch => {
  const config = {
    headers: {
      Accept: "application/json"
    }
  };

  try {
    const res = await axios.get(
      `https://gaia-mern-app.herokuapp.com/api/footprint/${country}`,
      config
    );
    res.data.earths += eater + flights + transportation;
    res.data.score = (Math.floor(res.data.earths * 100) / 100).toFixed(2);

    dispatch({
      type: QUIZ_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: QUIZ_FAIL
    });
  }
};
