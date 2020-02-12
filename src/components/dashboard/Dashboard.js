import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../layout/Navbar";
import CardUser from "./CardUser";
import ChallengeCard from "../layout/ChallengeCard";
import { getAllMyChallenges } from "../../actions/challenge";

const Dashboard = ({
  getAllMyChallenges,
  isAuthenticated,
  user,
  challengeCreated,
  challengeCompleted,
  challengeOpened
}) => {
  useEffect(() => {
    if (isAuthenticated && user) {
      getAllMyChallenges(user._id);
    }
  }, [getAllMyChallenges, isAuthenticated, user]);

  let renderCreatedChallenges = "";
  if (challengeCreated.length > 0) {
    renderCreatedChallenges = (
      <Fragment>
        <h3>Created Challenges</h3>
        {challengeCreated.map(challenge => (
          <ChallengeCard component={challenge} key={challenge._id} />
        ))}
      </Fragment>
    );
  }

  let nbChallengeOpen = 0;
  let renderOpenedChallenges = "";
  if (challengeOpened.length > 0) {
    nbChallengeOpen = challengeOpened.length;
    renderOpenedChallenges = (
      <Fragment>
        <h3>Created Challenges</h3>
        {challengeOpened.map(challenge => (
          <ChallengeCard component={challenge} key={challenge._id} />
        ))}
      </Fragment>
    );
  }

  let nbChallengeCompleted = 0;
  let renderCompletedChallenges = "";
  if (challengeCompleted.length > 0) {
    nbChallengeCompleted = challengeCompleted.length;
    renderCompletedChallenges = (
      <Fragment>
        <h3>Created Challenges</h3>
        {challengeCompleted.map(challenge => (
          <ChallengeCard component={challenge} key={challenge._id} />
        ))}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar /> <div className="nav-margin"></div>
      {/* Get the user infos */}
      <CardUser
        component={user}
        opened={nbChallengeOpen}
        completed={nbChallengeCompleted}
      />
      <div className="header-challenges">{renderOpenedChallenges}</div>
      <div className="header-challenges">{renderCompletedChallenges}</div>
      <div className="header-challenges">{renderCreatedChallenges}</div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  getAllMyChallenges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  challengeCreated: state.challenge.challengeCreated,
  challengeCompleted: state.challenge.challengeCompleted,
  challengeOpened: state.challenge.challengeOpened
});

export default connect(mapStateToProps, { getAllMyChallenges })(Dashboard);
