import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getChallenge, deleteChallenge } from "../../actions/challenge";
import { useParams, Link, useHistory } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Button from "@material-ui/core/Button";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import swal from "sweetalert";

const ShowChallenge = ({
  getChallenge,
  challenge,
  isMyChallenge,
  isOpenedChallenge,
  isCompletedChallenge,
  deleteChallenge,
  user
}) => {
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    if (user) {
      getChallenge(user._id, id);
    }
  }, [getChallenge, id, user]);

  const onDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Challenge!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Poof! Your Challenge has been deleted!", {
          icon: "success"
        });
        try {
          deleteChallenge(id);
          history.push(`/dashboard`);
        } catch (err) {
          console.log(err.response.data);
        }
      } else {
        swal("Your Challenge file is safe!");
      }
    });
  };

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

  const onSubmitJoin = e => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Do you want to start this Challenge?",
      buttons: true
    }).then(async willJoin => {
      if (willJoin) {
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
        } catch (err) {
          console.log(err.response.data);
        }
        swal("Great! Complete this Challenge and save the planet!");
        history.push(`/dashboard`);
      } else {
        swal("Are you a Chicken...");
      }
    });
  };

  const onSubmitCompleted = e => {
    e.preventDefault();
    swal({
      title: "Did you complete the Challenge?",
      buttons: true
    }).then(async willComplete => {
      if (willComplete) {
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

          history.push(`/dashboard`);
        } catch (err) {
          console.log(err.response.data);
        }
        swal("Great this is how you save the world!", {
          icon: "success"
        });
      } else {
        swal("Come back when you complete the challenge!");
      }
    });
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

        {!isOpenedChallenge && !isCompletedChallenge && buttonNotOpened}
        {isOpenedChallenge && !isCompletedChallenge && buttonOpened}

        {isCompletedChallenge && (
          <div className="show-title">
            <h2>Challenge Completed</h2>
            <Link to="/dashboard">
              <Button className="radiant-purple-btn show-btn">Back</Button>
            </Link>
          </div>
        )}
      </div>
      {isMyChallenge && (
        <div className="createdIcons">
          <Link to={`/edit_challenge/${id}`}>
            <EditIcon style={{ fontSize: 60 }} />
          </Link>
          <DeleteIcon style={{ fontSize: 60 }} onClick={onDelete} />
        </div>
      )}
    </Fragment>
  );
};

ShowChallenge.propTypes = {
  getChallenge: PropTypes.func.isRequired,
  challenge: PropTypes.object,
  deleteChallenge: PropTypes.func.isRequired,
  isMyChallenge: PropTypes.bool,
  isOpenedChallenge: PropTypes.bool,
  isCompletedChallenge: PropTypes.bool
};

const mapStateToProps = state => ({
  challenge: state.challenge.challenge,
  isMyChallenge: state.challenge.isMyChallenge,
  isOpenedChallenge: state.challenge.isOpenedChallenge,
  isCompletedChallenge: state.challenge.isCompletedChallenge,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  getChallenge,
  deleteChallenge
})(ShowChallenge);
