import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Button, Form, Header } from 'semantic-ui-react';
import { getEvent, editEvent } from '../../actions/event';

const EditEvent = ({
  event: { event, loading },
  editEvent,
  getEvent,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    organizer: '',
    name: '',
    avatar: '',
    description: ''
  });

  useEffect(() => {
    getEvent(match.params.id);

    setFormData({
      title: loading || !event || !event.title ? '' : event.title,
      location: loading || !event || !event.location ? '' : event.location,
      description:
        loading || !event || !event.description ? '' : event.description,
      date: loading || !event || !event.date ? '' : event.date,
      time: loading || !event || !event.time ? '' : event.time,
      name: loading || !event || !event.name ? '' : event.name,
      avatar: loading || !event || !event.avatar ? '' : event.avatar,
      organizer: loading || !event || !event.organizer ? '' : event.organizer
    });
  }, [loading, getEvent, match.params.id]);

  const {
    title,
    location,
    description,
    date,
    time,
    name,
    avatar,
    organizer
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <Form
        onSubmit={e => {
          e.preventDefault();
          editEvent(match.params.id, formData, history);
        }}
      >
        <Form.Field>
          <Header>Event's name</Header>
          <input
            type='text'
            placeholder="Event's title"
            name='title'
            required
            value={title}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <Header>Location</Header>
          <input
            type='text'
            placeholder="Event's location"
            name='location'
            required
            value={location}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Form.Group widths='equal'>
          <Form.Field>
            <div class='form-group'>
              <Header>Date</Header>
              <input
                type='date'
                name='date'
                required
                value={date}
                onChange={e => onChange(e)}
              />
            </div>
          </Form.Field>
          <Form.Field>
            <div class='form-group'>
              <Header>Starts hour</Header>
              <input
                type='time'
                name='time'
                value={time}
                onChange={e => onChange(e)}
              />
            </div>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Header>Desciption</Header>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder="Event's description, rules, etc."
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </Fragment>
  );
};

EditEvent.propTypes = {
  editEvent: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvent, editEvent })(
  withRouter(EditEvent)
);
