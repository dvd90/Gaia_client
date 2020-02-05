import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import gaiaLogo from "../../images/GAIA-logo.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    address: ""
  });

  const { name, email, password, password2, address } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Password do not match");
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password, address });
    }
  };

  return (
    <Fragment>
      <section className="register">
        <div className="register-logo-high">
          <img
            className="landing-logo-img register-logo"
            src={gaiaLogo}
            alt="gaia"
          />
        </div>
        <div className="header-title">Register</div>
        <form
          noValidate
          autoComplete="off"
          className="login-form register-form"
          onSubmit={e => onSubmit(e)}
        >
          <TextField
            label="Name"
            type="name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
          <TextField
            label="Password"
            autoComplete="current-password"
            type="password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
          <TextField
            label="Confirm Password"
            autoComplete="current-password"
            type="password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
          />
          <TextField
            label="Address"
            type="address"
            name="address"
            value={address}
            onChange={e => onChange(e)}
          />
          {/* Need to connect buttons */}
          <div className="landing-btns">
            <Button type="submit" className="radiant-green-btn">
              Signup
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default connect(null, { setAlert, register })(Register);
