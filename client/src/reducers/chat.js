import {
  ADD_CHAT,
  GET_CHATS,
  GET_CHAT,
  CHAT_ERROR,
  ADD_MESSAGE
} from '../actions/types';

const initialState = {
  chats: [],
  chat: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHATS:
      return {
        ...state,
        chats: payload,
        loading: false
      };
    case ADD_CHAT:
    case GET_CHAT:
      return {
        ...state,
        chat: payload,
        loading: false
      };
    case CHAT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_MESSAGE:
      return {
        ...state,
        chat: { ...state.chat, messages: [...state.chat.messages, payload] },
        loading: false
      };
    default:
      return state;
  }
}
