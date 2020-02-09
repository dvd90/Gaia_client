import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import FormQuiz from './components/quiz/FormQuiz';
import QuizResult from './components/quiz/QuizResult';
import './App.css';

// TEST
import ChallengeCard from './components/layout/ChallengeCard';

// REDUX
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route exact path='/' component={Landing} />
        <Alert />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/quiz' component={FormQuiz} />
          <Route exact path='/quiz_result' component={QuizResult} />
          {/* test layout */}
          <Route exact path='/test_layout' component={ChallengeCard} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
