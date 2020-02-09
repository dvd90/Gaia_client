import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

const ChallengeCard = (/*{ Challenge: { title, gaia_points, img } }*/) => {
  return (
    <div className='challenge_card'>
      <div className='img_challenge'>
        <img
          src='https://i.hurimg.com/i/hdn/75/0x0/5db68d3e67b0a91de849d9a6.jpg'
          alt=''
        />
      </div>
      <div className='challenge_info'>
        <h2 className='challenge_title'> Challenge 1 </h2>
        <p className='Challenge_impact'> Impact </p>
        <div className='stars'>
          {' '}
          <Rater total={5} rating={2} interactive={false} />
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
