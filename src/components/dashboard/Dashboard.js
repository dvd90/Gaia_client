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
  challenges,
  challengeCreated,
  challengeCompleted,
  challengeOpened
}) => {
  useEffect(() => {
    if (isAuthenticated && user) {
      getAllMyChallenges(user._id);
    }
  }, [getAllMyChallenges, isAuthenticated, user]);

  return (
    <Fragment>
      <Navbar /> <div className="nav-margin"></div>
      <CardUser
        component={user}
        opened={challengeOpened.length > 0 ? challengeOpened.length : 0}
        completed={
          challengeCompleted.length > 0 ? challengeCompleted.length : 0
        }
      />
      <div className="header-challenges">
        {challengeOpened.length > 0 && challenges ? (
          <Fragment>
            <h3>Opened Challenges</h3>
            {challengeOpened.map(challenge => (
              <ChallengeCard component={challenge} key={challenge._id} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            <h3>You didn't start yet...</h3>
            {challenges.map(challenge => (
              <ChallengeCard component={challenge} key={challenge._id} />
            ))}
          </Fragment>
        )}
      </div>
      <div className="header-challenges">
        {challengeCompleted.length > 0 ? (
          <Fragment>
            <h3>Completed Challenges</h3>
            {challengeCompleted.map(challenge => (
              <ChallengeCard component={challenge} key={challenge._id} />
            ))}
          </Fragment>
        ) : (
          ""
        )}
      </div>
      <div className="header-challenges">
        {challengeCreated.length > 0 ? (
          <Fragment>
            <h3>Created Challenges</h3>
            {challengeCreated.map(challenge => (
              <ChallengeCard component={challenge} key={challenge._id} />
            ))}
          </Fragment>
        ) : (
          ""
        )}
      </div>
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
  challenges: state.challenge.challenges,
  challengeCreated: state.challenge.challengeCreated,
  challengeCompleted: state.challenge.challengeCompleted,
  challengeOpened: state.challenge.challengeOpened
});

export default connect(mapStateToProps, { getAllMyChallenges })(Dashboard);
