import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllChallenges } from '../../actions/challenge';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import ChallengeCard from '../layout/ChallengeCard';
import Button from '@material-ui/core/Button';

const Challenges = ({ getAllChallenges, challenges }) => {
  useEffect(() => {
    getAllChallenges();
  }, [getAllChallenges]);

  const [tab, setTab] = useState(1);
  const [tabWaste, setTabWaste] = useState('selected');
  const [tabEnergy, setTabEnergy] = useState('');
  const [tabTransport, setTabTransport] = useState('');

  const onTabMenuClick = e => {
    if (e === 1) {
      setTabWaste('selected');
      setTabEnergy('');
      setTabTransport('');
    } else if (e === 2) {
      setTabWaste('');
      setTabEnergy('selected');
      setTabTransport('');
    } else {
      setTabWaste('');
      setTabEnergy('');
      setTabTransport('selected');
    }
    setTab(e);
  };

  const filterBy = category => {
    return (
      <Fragment>
        {challenges
          .filter(c => c.category === category)
          .map(challenge => (
            <ChallengeCard component={challenge} key={challenge._id} />
          ))}
      </Fragment>
    );
  };

  const listTabWaste = filterBy('Waste');
  const listTabEnergy = filterBy('Energy');
  const listTabTransport = filterBy('Transport');

  return (
    <Fragment>
      <Navbar /> <div className='nav-margin'></div>
      <div className='events-tabs'>
        <div className={`tab-link tab-link-challenge ${tabWaste}`}>
          <Link to='#!' onClick={e => onTabMenuClick(1)}>
            Waste
          </Link>
        </div>
        <div className={`tab-link tab-link-challenge ${tabEnergy}`}>
          <Link to='#!' onClick={e => onTabMenuClick(2)}>
            Energy
          </Link>
        </div>
        <div className={`tab-link tab-link-challenge ${tabTransport}`}>
          <Link to='#!' onClick={e => onTabMenuClick(3)}>
            Transport
          </Link>
        </div>
      </div>
      {tab === 1 && listTabWaste}
      {tab === 2 && listTabEnergy}
      {tab === 3 && listTabTransport}
      <Link to='/create_challenge'>
        <div className='landing-btns new-btn-cont'>
          <Button className='radiant-green-btn new-btn float-bottom'>
            Create a new challenge +
          </Button>
        </div>
      </Link>
    </Fragment>
  );
};

Challenges.propTypes = {
  getAllChallenges: PropTypes.func.isRequired,
  challenges: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  challenges: state.challenge.challenges
});

export default connect(mapStateToProps, { getAllChallenges })(Challenges);
