import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { setAlert } from "../../actions/alert";
import Navbar from "../layout/Navbar";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";
import axios from "axios";

const CreateChallenge = ({ setAlert }) => {
  const history = useHistory();
  const categories = ["Waste", "Energy", "Transport"];
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    gaia_points: 5,
    description: ""
  });

  const { title, category, description, gaia_points } = formData;

  const onChange = e => {
    if (e.type === "touchmove") {
      setFormData({ ...formData, gaia_points: e.srcElement.textContent });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (
      title !== "" &&
      description !== "" &&
      category !== "" &&
      formData.gaia_points !== ""
    ) {
      // Check size of title
      if (title.length < 24) {
        console.log("axios call :)", formData);
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.token
          }
        };
        const body = { title, category, description, gaia_points };
        try {
          const res = await axios.post(
            "https://gaia-mern-app.herokuapp.com/api/challenges",
            body,
            config
          );
          console.log("working", res.data);
          history.push(`/challenges/${res.data._id}`);
        } catch (err) {
          const errors = err.response.data.errors;

          if (errors) {
            errors.forEach(error => setAlert(error.msg, "danger"));
          }
        }
      } else {
        setAlert("Title need to be less then 24 characters", "danger");
      }
    } else {
      setAlert("All the inputs are required", "danger");
    }
  };

  return (
    <Fragment>
      <Navbar /> <div className="nav-margin"></div>
      <section className="register create-challenge">
        <div className="header-title">Create a Challenge</div>
        <form
          noValidate
          autoComplete="off"
          className="login-form register-form create-challenge-form"
          onSubmit={e => onSubmit(e)}
        >
          <TextField
            label="Title"
            type="title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
          />
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            name="category"
            onChange={e => onChange(e)}
            required
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="demo-simple-select-label">Impact</InputLabel>
          <Slider
            defaultValue={5}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={0}
            max={25}
            onChange={e => onChange(e)}
          />
          <TextField
            label="Description"
            type="description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
          />
          <div className="landing-btns">
            <Button type="submit" className="radiant-green-btn">
              Submit
            </Button>
            <Link to="/">
              <Button className="radiant-purple-btn">Back</Button>
            </Link>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

CreateChallenge.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(CreateChallenge);
