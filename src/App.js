import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FormQuiz from "./components/quiz/FormQuiz";
import QuizResult from "./components/quiz/QuizResult";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

// Custom Private Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// TEST
import MapBox from "./components/layout/Mapbox";

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
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/quiz" component={FormQuiz} />
            <Route exact path="/quiz_result" component={QuizResult} />
            <section id="private-routes">
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </section>
            {/* test layout */}
            <Route exact path="/test_layout" component={MapBox} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
