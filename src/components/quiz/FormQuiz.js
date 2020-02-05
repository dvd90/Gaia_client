import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import countryList from "./countries";
import PropTypes from "prop-types";
import { quizResult } from "../../actions/quizResult";

const FormQuiz = ({ quizResult }) => {
  const [formData, setFormData] = useState({
    country: "",
    eater: "",
    flights: "",
    transportation: ""
  });

  const eaterOptions = [
    ["Meat eater", 0.2],
    ["Vegan", 0],
    ["Vegetarian", -0.2]
  ];
  const flightOptions = [
    ["Never", -0.2],
    ["Between 1 & 3 times", 0.1],
    ["Between 4 & 8 times", 0.2],
    ["More than 8 times", 0.3]
  ];
  const transportOptions = [
    ["Foot", 0],
    ["Bicycle", 0],
    ["Car", 0.2]
  ];

  const { country, eater, flights, transportation } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    quizResult(formData);
  };

  return (
    <Fragment>
      <section className="quiz-form-page">
        <div className="header-title header-title-quiz">
          Be part of the change...
          <p className="header-paragraph">
            Please answer these question to find out your average footprint.
          </p>
        </div>
        <form
          noValidate
          autoComplete="off"
          className="login-form quiz-form"
          onSubmit={e => onSubmit(e)}
        >
          <InputLabel id="demo-simple-select-label">
            Where do you live?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            name="country"
            onChange={e => onChange(e)}
            required
          >
            {countryList.map(option => (
              <MenuItem key={option.countryName} value={option.countryCode}>
                {option.countryName}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="demo-simple-select-label">Eater?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={eater}
            name="eater"
            onChange={e => onChange(e)}
            required
          >
            {eaterOptions.map(option => (
              <MenuItem key={option[0]} value={option[1]}>
                {option[0]}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="demo-simple-select-label">
            How often do you flight per year?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={flights}
            name="flights"
            onChange={e => onChange(e)}
            required
          >
            {flightOptions.map(option => (
              <MenuItem key={option[0]} value={option[1]}>
                {option[0]}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="demo-simple-select-label">
            Transportation mode?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={transportation}
            name="transportation"
            onChange={e => onChange(e)}
            required
          >
            {transportOptions.map(option => (
              <MenuItem key={option[0]} value={option[1]}>
                {option[0]}
              </MenuItem>
            ))}
          </Select>
          <div className="quiz-btn">
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

FormQuiz.propTypes = {
  quizResult: PropTypes.func.isRequired
};

export default connect(null, { quizResult })(FormQuiz);
