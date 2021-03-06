import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import InfoPage from "./components/layout/InfoPage";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FormQuiz from "./components/quiz/FormQuiz";
import QuizResult from "./components/quiz/QuizResult";
import Dashboard from "./components/dashboard/Dashboard";

import gaiaLogo from "./images/GAIA-logo.png";
import "./App.css";

// Custom Private Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Challenges
import Challenges from "./components/challenges/Challenges";
import ShowChallenge from "./components/challenges/ShowChallenge";
import CreateChallenge from "./components/challenges/CreateChallenge";
import EditChallenge from "./components/challenges/EditChallenge";

// Events
import ShowEvent from "./components/events/ShowEvent";
import Events from "./components/events/Events";
import EditEvent from "./components/events/EditEvent";
import CreateEvent from "./components/events/CreateEvent";
import MyEvents from "./components/events/MyEvents";

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
  const isMobile = window.innerWidth <= 1024;

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  if (isMobile) {
    return (
      <Provider store={store}>
        <Router>
          <>
            <Alert />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/info" component={InfoPage} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/quiz" component={FormQuiz} />
              <Route exact path="/quiz_result" component={QuizResult} />
              <Route exact path="/challenges" component={Challenges} />
              <PrivateRoute
                exact
                path="/challenges/:id"
                component={ShowChallenge}
              />
              <PrivateRoute exact path="/events/:id" component={ShowEvent} />
              <Route exact path="/events" component={Events} />
              <PrivateRoute exact path="/my_events" component={MyEvents} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create_event"
                component={CreateEvent}
              />
              <PrivateRoute
                exact
                path="/edit_event/:id"
                component={EditEvent}
              />
              <PrivateRoute
                exact
                path="/create_challenge"
                component={CreateChallenge}
              />
              <PrivateRoute
                exact
                path="/edit_challenge/:id"
                component={EditChallenge}
              />
            </Switch>
          </>
        </Router>
      </Provider>
    );
  } else {
    return (
      <section id="notMobile">
        <div className="notMobile-logo">
          <img className="notMobile-logo-img" src={gaiaLogo} alt="gaia-logo" />
        </div>
        <div className="text-mobile">
          <h1>
            Ooopppss our development version is mobile and tablet based :)
          </h1>
          <h5>Please go on the website with your mobile or your tablet...</h5>
          <p>See you soon</p>
        </div>
      </section>
    );
  }
};

export default App;
