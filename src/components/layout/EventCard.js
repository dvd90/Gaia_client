import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EventCard = ({ component }) => {
  let renderCard = "";
  if (component) {
    renderCard = (
      <Fragment>
        <Link to={`events/${component._id}`}>
          <div className="challenge_card">
            <div className="img_challenge">
              <img
                src="https://i.hurimg.com/i/hdn/75/0x0/5db68d3e67b0a91de849d9a6.jpg"
                alt=""
              />
            </div>
            <div className="challenge_info">
              <h2 className="challenge_title">{component.title}</h2>
            </div>
          </div>
        </Link>
      </Fragment>
    );
  }
  return <Fragment>{renderCard}</Fragment>;
};

EventCard.propTypes = {
  component: PropTypes.object
};

export default EventCard;
