import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEvent } from "../../actions/event";
import {
  Button,
  Form,
  Header
} from "semantic-ui-react";

const AddEvent = ({ auth: { user }, addEvent, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    organizer: "",
    name: "",
    avatar: "",
    description: "",
  });

  const { title, location, date, time, organizer, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addEvent(formData, history);
        }}
      >
        <Form.Field>
          <Header>Event's name</Header>
          <input
            type="text"
            placeholder="Event's title"
            name="title"
            required
            value={title}
            onChange={(e) => onChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <Header>Location</Header>
          <input
            type="text"
            placeholder="Event's location"
            name="location"
            required
            value={location}
            onChange={(e) => onChange(e)}
          />
        </Form.Field>
        <Form.Group widths='equal'>
        <Form.Field>
          <div class="form-group">
            <Header>Date</Header>
            <input
              type="date"
              name="date"
              required
              value={date}
              onChange={(e) => onChange(e)}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <div class="form-group">
            <Header>Starts hour</Header>
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => onChange(e)}
            />
          </div>
        </Form.Field>
        </Form.Group>
        <Form.Field>
          <Header>Desciption</Header>
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Event's description, rules, etc."
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </Form.Field>
        <Button type='submit' >
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

AddEvent.propTypes = {
  addEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addEvent })(withRouter(AddEvent));
