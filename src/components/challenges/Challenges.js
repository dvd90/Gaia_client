import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllChallenges } from "../../actions/challenge";
import PropTypes from "prop-types";
import Navbar from "../layout/Navbar";
import ChallengeCard from "../layout/ChallengeCard";
import Button from "@material-ui/core/Button";

const Challenges = ({ getAllChallenges, challenges }) => {
  useEffect(() => {
    getAllChallenges();
  }, [getAllChallenges]);

  return (
    <Fragment>
      <Navbar /> <div className="nav-margin"></div>
      {challenges.map(challenge => (
        <ChallengeCard component={challenge} key={challenge._id} />
      ))}
      <Link to="/create_challenge">
        <div className="landing-btns new-btn-cont">
          <Button className="radiant-green-btn new-btn">
            Create a new challenge +
          </Button>
        </div>
      </Link>
    </Fragment>
  );
};

Challenges.propTypes = {
  getAllChallenges: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool
  challenges: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  challenges: state.challenge.challenges
});

export default connect(mapStateToProps, { getAllChallenges })(Challenges);
