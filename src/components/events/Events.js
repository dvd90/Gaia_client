import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../actions/event';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import Button from '@material-ui/core/Button';
import EventCard from '../layout/EventCard';
import Mapbox from '../layout/Mapbox';

const Events = ({ getAllEvents, events }) => {
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const [tab, setTab] = useState(1);
  const [tabOne, setTabOne] = useState('selected');
  const [tabTwo, setTabTwo] = useState('');

  const onTabMenuClick = e => {
    if (e === 1) {
      setTabOne('selected');
      setTabTwo('');
    } else {
      setTabOne('');
      setTabTwo('selected');
    }
    setTab(e);
  };

  const listTab = (
    <Fragment>
      {' '}
      {events.map(event => (
        <EventCard component={event} key={event._id} />
      ))}
    </Fragment>
  );

  const mapTab = (
    <Fragment>
      <Mapbox />
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar /> <div className='nav-margin'></div>
      <div className='events-tabs'>
        <div className={`tab-link ${tabOne}`}>
          <Link to='#!' onClick={e => onTabMenuClick(1)}>
            List
          </Link>
        </div>
        <div className={`tab-link ${tabTwo}`}>
          <Link to='#!' onClick={e => onTabMenuClick(2)}>
            Map
          </Link>
        </div>
      </div>
      {tab === 1 ? listTab : mapTab}
      <Link to='/create_event'>
        <div className='landing-btns new-btn-cont'>
          <Button className='radiant-purple-btn new-btn float-bottom'>
            Create a new event +
          </Button>
        </div>
      </Link>
    </Fragment>
  );
};

Events.propTypes = {
  getAllEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events
});

export default connect(mapStateToProps, { getAllEvents })(Events);
