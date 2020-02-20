import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getChallenge } from "../../actions/challenge";
import { useParams, Link, useHistory } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Button from "@material-ui/core/Button";
import axios from "axios";

const ShowChallenge = ({
  getChallenge,
  challenge,
  challengeOpened,
  challengeCompleted
}) => {
  const history = useHistory();
  let { id } = useParams();
  useEffect(() => {
    getChallenge(id);
  }, [getChallenge, id]);

  const showImage = component => {
    let image = "";
    if (component.category === "Waste") {
      image = (
        <img
          src="https://i.ibb.co/YTZTCB5/jasmin-sessler-5-Wfttm2-Cje-I-unsplash.jpg"
          alt=""
        />
      );
    } else if (component.category === "Energy") {
      image = (
        <img
          src="https://i.ibb.co/qpdzF74/gonz-ddl-a1-Lm99-Kkqtg-unsplash.jpg"
          alt=""
        />
      );
    } else {
      image = (
        <img
          src="https://i.ibb.co/SV2ktWy/paolo-chiabrando-KSwd2lb3lfs-unsplash.jpg"
          alt=""
        />
      );
    }
    return image;
  };

  const isOpened = id => {
    let check = challengeOpened.filter(challenge => challenge._id === id);
    return check.length > 0;
  };

  const isCompleted = id => {
    let check = challengeCompleted.filter(challenge => challenge._id === id);
    return check.length > 0;
  };

  const onSubmitJoin = async e => {
    e.preventDefault();
    const config = {
      headers: {
        "x-auth-token": localStorage.token
      }
    };
    try {
      const res = await axios.put(
        `https://gaia-mern-app.herokuapp.com/api/challenges/${id}/join`,
        config
      );
      console.log(res.data);
      await alert("Challenge accepted");

      history.push(`/dashboard`);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const onSubmitCompleted = async e => {
    e.preventDefault();
    const config = {
      headers: {
        "x-auth-token": localStorage.token
      }
    };
    try {
      const res = await axios.put(
        `https://gaia-mern-app.herokuapp.com/api/challenges/${id}/completed`,
        config
      );
      console.log(res.data);
      await alert("Great this is how you save the world");

      history.push(`/dashboard`);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const buttonNotOpened = (
    <Fragment>
      <div className="show-btns">
        <Link to="/#!">
          <Button
            className="radiant-green-btn show-btn"
            onClick={e => onSubmitJoin(e)}
          >
            Accept
          </Button>
        </Link>
        <Link to="/challenges">
          <Button className="radiant-purple-btn show-btn">Back</Button>
        </Link>
      </div>
    </Fragment>
  );

  const buttonOpened = (
    <Fragment>
      <div className="show-btns show-btns">
        <Link to="/#!">
          <Button
            className="radiant-green-btn show-btn"
            onClick={e => onSubmitCompleted(e)}
          >
            Confirm
          </Button>
        </Link>
        <Link to="/challenges">
          <Button className="radiant-purple-btn show-btn">Back</Button>
        </Link>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar />
      <div className="show-container">
        <div className="show-banner">{challenge && showImage(challenge)}</div>
        {challenge && (
          <Fragment>
            <div className="show-title">
              <h2>{challenge.title}</h2>
            </div>
            <div className="show-points">
              Gaia points: {challenge.gaia_points}{" "}
              <i className="fas fa-globe-europe" />
              <p className="show-description">{challenge.description}</p>
            </div>
          </Fragment>
        )}
        {!isOpened(id) && !isCompleted(id) && buttonNotOpened}
        {isOpened(id) && !isCompleted(id) && buttonOpened}
        {isCompleted(id) && "Challenge Completed"}
      </div>
    </Fragment>
  );
};

ShowChallenge.propTypes = {
  getChallenge: PropTypes.func.isRequired,
  challenge: PropTypes.object,
  challengeOpened: PropTypes.array
};

const mapStateToProps = state => ({
  challenge: state.challenge.challenge,
  challengeOpened: state.challenge.challengeOpened,
  challengeCompleted: state.challenge.challengeCompleted
});

export default connect(mapStateToProps, { getChallenge })(ShowChallenge);
