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

const CreateEvent = props => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    starts_at: "",
    ends_at: "",
    description: ""
  });

  const { title, location, description, starts_at, ends_at } = formData;

  const onChange = e => {
    if (e.type === "touchmove") {
      setFormData({ ...formData, gaia_points: e.srcElement.textContent });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Fragment>
      <Navbar /> <div className="nav-margin"></div>
      <section className="register create-challenge create-event">
        <div className="header-title">Create an Event</div>
        <form
          noValidate
          autoComplete="off"
          className="login-form register-form create-challenge- create-event-form"
          onSubmit={e => onSubmit(e)}
        >
          <TextField
            label="Title"
            type="title"
            name="title"
            value={title}
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

CreateEvent.propTypes = {};

export default CreateEvent;
