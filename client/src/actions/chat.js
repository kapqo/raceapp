import axios from 'axios';
import { setAlert } from './alert';
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
    const res = await axios.post('/api/chats/', { formData }, config);

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
