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
        events: payload,
        loading: false
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [payload, ...state.events],
        loading: false
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== payload),
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        event: null
      };
    case CLEAR_EVENT:
      return {
        ...state,
        event: null,
        loading: false
      };
    case UPDATE_SURE:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === payload.id ? { ...event, sure: payload.sure } : event
        ),
        loading: false
      };
    case UPDATE_UNSURE:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === payload.id
            ? { ...event, unsure: payload.unsure }
            : event
        ),
        loading: false
      };
    default:
      return state;
  }
}
