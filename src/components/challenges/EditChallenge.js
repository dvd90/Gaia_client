import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { setAlert } from '../../actions/alert';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';

const EditChallenge = ({ setAlert, challenge }) => {
  const history = useHistory();
  let { id } = useParams();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [gaia_points, setGaia_points] = useState('');
  const [description, setDescription] = useState('');
  const [impact, setImpact] = useState('');

  useEffect(() => {
    if (challenge) {
      setTitle(challenge.title);
      setCategory(challenge.category);
      setGaia_points(challenge.gaia_points);
      setDescription(challenge.description);
      setImpact(challenge.impact);
    }
  }, [challenge]);

  const onSubmit = async e => {
    e.preventDefault();
    if (
      title !== '' &&
      description !== '' &&
      category !== '' &&
      gaia_points !== ''
    ) {
      // Check size of title
      if (title.length < 24) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.token
          }
        };
        const body = { title, category, description, gaia_points };
        try {
          const res = await axios.put(
            `https://gaia-mern-app.herokuapp.com/api/challenges/${id}`,
            body,
            config
          );
          console.log('working', res.data);
          history.push(`/challenges/${res.data._id}`);
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
  const categories = ['Waste', 'Energy', 'Transport'];
  return (
    <Fragment>
      <Navbar /> <div className='nav-margin'></div>
      <section className='register create-challenge'>
        <div className='header-title'>Edit a Challenge</div>
        <form
          noValidate
          autoComplete='off'
          className='login-form register-form create-challenge-form'
          onSubmit={e => onSubmit(e)}
        >
          <TextField
            label='Title'
            type='title'
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <InputLabel id='demo-simple-select-label'>Category</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={category}
            name='category'
            onChange={e => setCategory(e.target.value)}
            required
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id='demo-simple-select-label'>Impact</InputLabel>
          <Slider
            defaultValue={5}
            aria-labelledby='discrete-slider'
            valueLabelDisplay='auto'
            step={5}
            marks
            min={0}
            max={25}
            onChange={e => setImpact(e.target.value)}
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
            <Link to='/dashboard'>
              <Button className='radiant-purple-btn'>Back</Button>
            </Link>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

EditChallenge.propTypes = {
  setAlert: PropTypes.func.isRequired,
  challenge: PropTypes.object
};
const mapStateToProps = state => ({
  challenge: state.challenge.challenge
});

export default connect(mapStateToProps, { setAlert })(EditChallenge);
