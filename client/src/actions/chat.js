import axios from 'axios';
import {
  ADD_CHAT,
  GET_CHATS,
  GET_CHAT,
  CHAT_ERROR,
  ADD_MESSAGE
} from './types';

//Create new chat with someone
export const addChat = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/chats', formData, config);

    dispatch({
      type: ADD_CHAT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get all my chats
export const getMyChats = () => async dispatch => {
  try {
    const res = await axios.get('/api/chats/myChats');

    dispatch({
      type: GET_CHATS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CHAT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Get chat
export const getChat = id => async dispatch => {
  try {
    const res = await axios.get(`/api/chats/${id}`);

    dispatch({
      type: GET_CHAT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Send message
export const sendMessage = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/chats/message/${id}`, formData, config);

    dispatch({
      type: ADD_MESSAGE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
