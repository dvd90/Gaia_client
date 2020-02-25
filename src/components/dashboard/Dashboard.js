import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "../layout/Navbar";
import CardUser from "./CardUser";
import ChallengeCard from "../layout/ChallengeCard";
import { getAllMyChallenges } from "../../actions/challenge";
import { loadUser } from "../../actions/auth";

const Dashboard = ({
  loadUser,
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

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const [tab, setTab] = useState(2);
  const [tabCreated, setTabCreated] = useState("");
  const [tabAll, setTabAll] = useState("selected");
  const [tabCompleted, setTabCompleted] = useState("");
  const [tabOpened, setTabOpened] = useState("");

  const onTabMenuClick = e => {
    if (e === 1) {
      setTabCreated("selected");
      setTabAll("");
      setTabCompleted("");
      setTabOpened("");
    } else if (e === 2) {
      setTabCreated("");
      setTabAll("selected");
      setTabCompleted("");
      setTabOpened("");
    } else if (e === 3) {
      setTabCreated("");
      setTabAll("");
      setTabCompleted("selected");
      setTabOpened("");
    } else {
      setTabCreated("");
      setTabAll("");
      setTabCompleted("");
      setTabOpened("selected");
    }
    setTab(e);
  };

  const createTab = elements => {
    return (
      <>
        {elements.map(element => (
          <ChallengeCard component={element} key={element._id} />
        ))}
      </>
    );
  };
  const listTabCreated = createTab(challengeCreated);
  const listTabCompleted = createTab(challengeCompleted);
  const listTabOpened = createTab(challengeOpened);
  const listTabAll = createTab(challenges);

  return (
    <>
      <Navbar /> <div className="nav-margin"></div>
      <CardUser
        component={user}
        opened={challengeOpened.length > 0 ? challengeOpened.length : 0}
        completed={
          challengeCompleted.length > 0 ? challengeCompleted.length : 0
        }
      />
      <div className="header-challenges">
        <h3>Challenges</h3>
      </div>
      <div className="events-tabs">
        <div className={`tab-link tab-link-dasboard ${tabAll}`}>
          <Link to="#!" onClick={e => onTabMenuClick(2)}>
            All
          </Link>
        </div>
        <div className={`tab-link tab-link-dasboard ${tabCreated}`}>
          <Link to="#!" onClick={e => onTabMenuClick(1)}>
            Created
          </Link>
        </div>
        <div className={`tab-link tab-link-dasboard ${tabCompleted}`}>
          <Link to="#!" onClick={e => onTabMenuClick(3)}>
            Completed
          </Link>
        </div>
        <div className={`tab-link tab-link-dasboard ${tabOpened}`}>
          <Link to="#!" onClick={e => onTabMenuClick(4)}>
            Opened
          </Link>
        </div>
      </div>
      {tab === 1 && listTabCreated}
      {tab === 2 && listTabAll}
      {tab === 3 && listTabCompleted}
      {tab === 4 && listTabOpened}
    </>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  getAllMyChallenges: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  challenges: state.challenge.challenges,
  challengeCreated: state.challenge.challengeCreated,
  challengeCompleted: state.challenge.challengeCompleted,
  challengeOpened: state.challenge.challengeOpened
});

export default connect(mapStateToProps, { getAllMyChallenges, loadUser })(
  Dashboard
);
