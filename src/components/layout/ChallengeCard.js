import React from "react";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import PropTypes from "prop-types";
import "react-rater/lib/react-rater.css";

const ChallengeCard = ({ component }) => {
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

  return (
    <>
      {!component ? (
        ""
      ) : (
        <Link to={`challenges/${component._id}`}>
          <div className="challenge_card">
            <div className="img_challenge">{showImage(component)}</div>
            <div className="challenge_info">
              <h2 className="challenge_title card-title">{component.title}</h2>
              <p className="Challenge_impact"> Impact </p>
              <div className="stars">
                {" "}
                <Rater
                  total={5}
                  rating={component.gaia_points / 5}
                  interactive={false}
                />
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

ChallengeCard.propTypes = {
  component: PropTypes.object
};

export default ChallengeCard;
