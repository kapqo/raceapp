import {
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS,
  NOTIFICATION_ERROR
} from '../actions/types';

const initialState = {
  notifications: [],
  notification: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload,
        loading: false
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notification: payload,
        loading: false
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
