import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import quizResult from "./quizResult";

export default combineReducers({ alert, auth, quizResult });
