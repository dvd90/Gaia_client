import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { setAlert } from "../../actions/alert";
import Navbar from "../layout/Navbar";
import axios from "axios";
import Calendar from "ciqu-react-calendar";

const CreateEvent = ({ setAlert }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    starts_at: "",
    ends_at: "",
    description: ""
  });

  const { title, location, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeStarts = e => {
    setFormData({ ...formData, starts_at: e.format("MM-DD-YYYY") });
  };

  const onChangeEnds = e => {
    setFormData({ ...formData, ends_at: e.format("MM-DD-YYYY") });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (
      title !== "" &&
      description !== "" &&
      location !== "" &&
      formData.starts_at !== "" &&
      formData.ends_at !== ""
    ) {
      console.log("axios call :)", formData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token
        }
      };

      try {
        const res = await axios.post(
          "https://gaia-mern-app.herokuapp.com/api/events",
          formData,
          config
        );
        console.log("working", res.data);
        history.push(`/events/${res.data._id}`);
      } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach(error => setAlert(error.msg, "danger"));
        }
      }
    } else {
      setAlert("All the inputs are required", "danger");
    }
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
          <TextField
            label="Location"
            type="location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <TextField
            label="Description"
            type="description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
          />
          <div className="date-event-picker">
            <InputLabel id="demo-simple-select-label">
              Date of the event
            </InputLabel>

            <Calendar
              className="date-picker"
              allowClear={true}
              disabled={false}
              placeholder={"Start date"}
              format={"MM-DD-YYYY"}
              onChange={e => onChangeStarts(e)}
            />

            <Calendar
              className="date-picker"
              allowClear={true}
              disabled={false}
              placeholder={"End date"}
              format={"MM-DD-YYYY"}
              onChange={e => onChangeEnds(e)}
            />
          </div>
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
export default connect(null, { setAlert })(CreateEvent);
