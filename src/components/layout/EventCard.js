import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const EventCard = ({ component }) => {
  return (
    <Fragment>
      {!component ? (
        ''
      ) : (
        <Fragment>
          <Link to={`events/${component._id}`}>
            <div className='challenge_card'>
              <div className='img_challenge'>
                <img
                  src='https://i.ibb.co/GJnkbWN/aranxa-esteve-S5-DEUg2y-UVU-unsplash.jpg'
                  alt=''
                />
              </div>
              <div className='challenge_info'>
                <h2 className='challenge_title card-title'>
                  {component.title}
                </h2>
                <h2 className='challenge_title'>
                  <i className='far fa-clock'> </i>{' '}
                  {moment(component.starts_at).fromNow()}
                </h2>
                <h2 className='challenge_title'>
                  {' '}
                  <i className='fas fa-map-pin'></i> {component.location}
                </h2>
              </div>
            </div>
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

EventCard.propTypes = {
  component: PropTypes.object
};

export default EventCard;
