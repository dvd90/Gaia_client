import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import quizResult from "./quizResult";
import challenge from "./challenge";
import event from "./event";

export default combineReducers({ alert, auth, quizResult, challenge, event });
