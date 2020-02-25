import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const InfoPage = () => {
  return (
    <section id="info-page">
      <div className="title-info-page">
        <h1>Make a change one Challenge at the time .</h1>
      </div>
      <div className="title-info-page-com">
        <h4>
          Gaia is a community of likeminded people with the goal of reducing our
          day to day footprint . Let’s be responsible and respect GAIA.
        </h4>
      </div>
      <div className="title-info-page-side">
        <h5>The concept is simple</h5>
        <div className="title-info-page-steps">
          <h6>3 Steps to start</h6>
        </div>
      </div>
      <div className="step-one step">
        <h2>Step 1: Choose a challenge</h2>
      </div>
      <div className="step-two step">
        <h2>Step 2: Complete the challenge</h2>
      </div>
      <div className="step-three step">
        <h2>
          Step 3: Change the way you see GAIA and become part of the community{" "}
        </h2>
      </div>
      <Link to="/quiz">
        <div className="landing-btns new-btn-cont">
          <Button className="radiant-green-btn new-btn float-bottom">
            Start your Journey
          </Button>
        </div>
      </Link>
    </section>
  );
};

export default InfoPage;
