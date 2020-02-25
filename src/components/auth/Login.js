import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import gaiaLogo from "../../images/GAIA-logo.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { login, loadUser } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated, loadUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    loadUser();
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <section className="login">
        <div className="landing-logo">
          <img className="landing-logo-img" src={gaiaLogo} alt="gaia-logo" />
        </div>
        <div className="header-title">Login</div>
        <form
          noValidate
          autoComplete="off"
          className="login-form"
          onSubmit={e => onSubmit(e)}
        >
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
          <div className="landing-btns quiz-btn">
            <Button type="submit" className="radiant-green-btn">
              Login
            </Button>
            <Link to="/">
              <Button className="radiant-purple-btn">Back</Button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login, loadUser })(Login);
