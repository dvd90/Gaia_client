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
  auth,
  challenge_created
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      getAllMyChallenges(auth.user._id);
    }
  }, [auth, getAllMyChallenges, isAuthenticated]);
  let renderCreatedChallenges = "";
  if (challenge_created.length > 0) {
    renderCreatedChallenges = (
      <Fragment>
        <h3>Created Challenges</h3>
        {challenge_created.map(challenge => (
          <ChallengeCard component={challenge} key={challenge._id} />
        ))}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />
      {/* Get the user infos */}
      <CardUser component={auth.user} nbc={challenge_created.length} />
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
  auth: state.auth,
  challenge_created: state.challenge.challenge_created
});

export default connect(mapStateToProps, { getAllMyChallenges })(Dashboard);
