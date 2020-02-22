import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvent, deleteEvent } from '../../actions/event';
import { useParams, Link, useHistory } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const ShowEvent = ({ getEvent, event, isMyEvent, deleteEvent, user }) => {
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    if (user) {
      getEvent(user._id, id);
    }
  }, [getEvent, id, user]);

  const onDelete = () => {
    try {
      deleteEvent(id);
      history.push(`/dashboard`);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className='show-container'>
        <div className='show-banner'>
          <img
            src='https://i.ibb.co/GJnkbWN/aranxa-esteve-S5-DEUg2y-UVU-unsplash.jpg'
            alt='veeterzy-s-MQi-L-2v4vs-unsplash'
            border='0'
          />
        </div>
        {event ? (
          <Fragment>
            <div className='show-title'>
              <h2>{event.title}</h2>
            </div>
            <div className='show-points'>
              <p className='show-description'>{event.starts_at}</p>
              <p className='show-description'>{event.location}</p>
              <p className='show-description'>{event.description}</p>
              <div className='show-btns'>
                <Link to='/#!'>
                  <Button className='radiant-green-btn show-btn'>Join</Button>
                </Link>
                <Link to='/events'>
                  <Button className='radiant-purple-btn show-btn'>Back</Button>
                </Link>
              </div>
            </div>
          </Fragment>
        ) : (
          ''
        )}
      </div>
      {isMyEvent ? (
        <div className='deleteIcon'>
          <DeleteIcon style={{ fontSize: 60 }} onClick={onDelete} />
        </div>
      ) : null}
    </Fragment>
  );
};

ShowEvent.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object,
  deleteEvent: PropTypes.func.isRequired,
  isMyEvent: PropTypes.bool
};

const mapStateToProps = state => ({
  event: state.event.event,
  user: state.auth.user,
  isMyEvent: state.event.isMyEvent
});

export default connect(mapStateToProps, { getEvent, deleteEvent })(ShowEvent);
