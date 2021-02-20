import axios from 'axios';
import {
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS,
  NOTIFICATION_ERROR
} from './types';

export const addNotification = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/notifications', formData, config);

    dispatch({
      type: ADD_NOTIFICATION,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getNotifications = () => async dispatch => {
  try {
    const res = await axios.get('/api/notifications/');

    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
