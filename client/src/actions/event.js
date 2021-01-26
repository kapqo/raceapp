import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EVENT,
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  EVENT_ERROR,
  CLEAR_EVENT,
  UPDATE_SURE,
  UPDATE_UNSURE
} from './types';

//Get events
export const getEvents = () => async dispatch => {
  dispatch({ type: CLEAR_EVENT });
  try {
    const res = await axios.get('/api/events');
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Get event
export const getEvent = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`);
    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//delete event
export const deleteEvent = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/events/${id}`);
    dispatch({
      type: DELETE_EVENT,
      payload: res.data
    });
    dispatch(setAlert('Event Removed', 'success'));
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Add event
export const addEvent = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/events/', formData, config);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    dispatch(setAlert('Event Created', 'success'));
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Add sure member
export const addSure = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/sure/${id}`);

    dispatch({
      type: UPDATE_SURE,
      payload: { id, sure: res.data }
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Remove sure member
export const removeSure = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/leaveSure/${id}`);

    dispatch({
      type: UPDATE_SURE,
      payload: { id, sure: res.data }
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Add unsure member
export const addUnsure = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/unsure/${id}`);

    dispatch({
      type: UPDATE_UNSURE,
      payload: { id, sure: res.data }
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Remove unsure member
export const removeUnsure = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/leaveUnsure/${id}`);

    dispatch({
      type: UPDATE_UNSURE,
      payload: { id, sure: res.data }
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Edit Event
export const editEvent = (eventId, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/events/${eventId}`, formData, config);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });

    dispatch(setAlert('Event Updated', 'success'));

    history.push('/events');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EVENT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
