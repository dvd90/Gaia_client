import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';
import PropTypes from 'prop-types';
import 'react-rater/lib/react-rater.css';

const ChallengeCard = ({ component }) => {
  return (
    <Fragment>
      {!component ? (
        ''
      ) : (
        <Link to={`challenges/${component._id}`}>
          <div className='challenge_card'>
            <div className='img_challenge'>
              <img
                src='https://i.hurimg.com/i/hdn/75/0x0/5db68d3e67b0a91de849d9a6.jpg'
                alt=''
              />
            </div>
            <div className='challenge_info'>
              <h2 className='challenge_title'>{component.title}</h2>
              <p className='Challenge_impact'> Impact </p>
              <div className='stars'>
                {' '}
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
    </Fragment>
  );
};

ChallengeCard.propTypes = {
  component: PropTypes.object
};

export default ChallengeCard;
