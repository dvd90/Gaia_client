import React from "react";
import gaiaLogo from "../../images/GAIA-logo.png";
import planetLogo from "../../images/planet_cons.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const QuizResult = () => {
  return (
    <>
      <section className="quiz-result-page">
        <div className="register-logo-high">
          <img
            className="landing-logo-img register-logo"
            src={gaiaLogo}
            alt="gaia"
          />
        </div>
        <div className="header-title">
          This is the number of planet you need in a year...
        </div>
        <div className="quiz-result-consuption">
          <div className="digit-quiz-result">
            {localStorage.getItem("score")}
          </div>
          <div className="logo-quiz-result">
            <img src={planetLogo} alt="gaia" />
          </div>
        </div>
        <div className="landing-quotes quiz-quote">
          <p className="quote">
            “The question that will decide our destiny is not whether we shall
            expand into space. It is: shall we be one species or a million? A
            million species will not exhaust the ecological niches that are
            awaiting the arrival of intelligence.”
          </p>
          <p className="quote-author">Freeman Dyson</p>
          <div className="landing-btns">
            <Link to="/register">
              <Button className="radiant-green-btn">Join the movement</Button>
            </Link>
            <Link to="/">
              <Button className="radiant-purple-btn">Back</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuizResult;
