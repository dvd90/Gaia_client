import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setAlert } from '../../actions/alert';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import axios from 'axios';

const EditEvent = ({ setAlert, event }) => {
  const history = useHistory();
  let { id } = useParams();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setLocation(event.location);
      setDescription(event.description);
    }
  }, [event]);

  const onSubmit = async e => {
    e.preventDefault();
    if (title !== '' && location !== '' && description !== '') {
      // Check size of title
      if (title.length < 24) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.token
          }
        };
        const body = { title, location, description };
        try {
          const res = await axios.put(
            `https://gaia-mern-app.herokuapp.com/api/events/${id}`,
            body,
            config
          );
          console.log('working', res.data);
          history.push(`/events/${res.data._id}`);
        } catch (err) {
          const errors = err.response.data.errors;

          if (errors) {
            errors.forEach(error => setAlert(error.msg, 'danger'));
          }
        }
      } else {
        setAlert('Title need to be less then 24 characters', 'danger');
      }
    } else {
      setAlert('All the inputs are required', 'danger');
    }
  };

  return (
    <Fragment>
      <Navbar /> <div className='nav-margin'></div>
      <section className='register create-challenge create-event'>
        <div className='header-title'>Create an Event</div>
        <form
          noValidate
          autoComplete='off'
          className='login-form register-form create-challenge- create-event-form'
          onSubmit={e => onSubmit(e)}
        >
          <TextField
            label='Title'
            type='title'
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            label='Location'
            type='location'
            name='location'
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <TextField
            label='Description'
            type='description'
            name='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div className='landing-btns'>
            <Button type='submit' className='radiant-green-btn'>
              Submit
            </Button>
            <Link to={`/events/${id}`}>
              <Button className='radiant-purple-btn'>Back</Button>
            </Link>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
EditEvent.propTypes = {
  setAlert: PropTypes.func.isRequired,
  event: PropTypes.object
};
const mapStateToProps = state => ({
  event: state.event.event
});

export default connect(mapStateToProps, { setAlert })(EditEvent);
