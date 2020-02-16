import React, { Fragment, useEffect, useState } from "react";
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

  const [renderCreatedChallenges, setRenderCreatedChallenges] = useState("");

  if (challengeCreated.length > 0) {
    setRenderCreatedChallenges(
      <Fragment>
        <h3>Created Challenges</h3>
        {challengeCreated.map(challenge => (
          <ChallengeCard component={challenge} key={challenge._id} />
        ))}
      </Fragment>
    );
  }

  const [nbChallengeOpen, setNbChallengeOpen] = useState(0);
  const [renderOpenedChallenges, setRenderOpenedChallenges] = useState("");
  if (challengeOpened.length > 0) {
    setNbChallengeOpen(challengeOpened.length);
    setRenderOpenedChallenges(
      <Fragment>
        <h3>Created Challenges</h3>
        {challengeOpened.map(challenge => (
          <ChallengeCard component={challenge} key={challenge._id} />
        ))}
      </Fragment>
    );
  }

  const [nbChallengeCompleted, setNbChallengeCompleted] = useState(0);
  const [renderCompletedChallenges, setRenderCompletedChallenges] = useState(
    ""
  );
  if (challengeCompleted.length > 0) {
    setNbChallengeCompleted(challengeCompleted.length);
    setRenderCompletedChallenges(
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
