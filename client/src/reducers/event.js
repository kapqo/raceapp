import {
  GET_EVENT,
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  EVENT_ERROR,
  CLEAR_EVENT,
  UPDATE_SURE,
  UPDATE_UNSURE
} from '../actions/types';

const initialState = {
  events: [],
  event: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        groups: payload,
        loading: false
      };
    case GET_EVENT:
      return {
        ...state,
        group: payload,
        loading: false
      };
    case ADD_EVENT:
      return {
        ...state,
        groups: [payload, ...state.groups],
        loading: false
      };
    case DELETE_EVENT:
      return {
        ...state,
        groups: state.groups.filter(group => group._id !== payload),
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        group: null
      };
    case CLEAR_EVENT:
      return {
        ...state,
        group: null,
        loading: false
      };
    case UPDATE_SURE:
      return {
        ...state,
        groups: state.groups.map(group =>
          group._id === payload.id
            ? { ...group, members: payload.members }
            : group
        ),
        loading: false
      };
    case UPDATE_SURE:
      return {
        ...state,
        groups: state.groups.map(group =>
          group._id === payload.id
            ? { ...group, members: payload.members }
            : group
        ),
        loading: false
      };
    default:
      return state;
  }
}
