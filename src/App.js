import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FormQuiz from "./components/quiz/FormQuiz";
import QuizResult from "./components/quiz/QuizResult";
import "./App.css";

// TEST
import Navbar from "./components/layout/Navbar";

// REDUX
import { Provider } from "react-redux";
import store from "./store";

// Auth
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/quiz" component={FormQuiz} />
            <Route exact path="/quiz_result" component={QuizResult} />
            {/* test layout */}
            <Route exact path="/test_layout" component={Navbar} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
