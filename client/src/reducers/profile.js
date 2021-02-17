import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_VEHICLE,
  VEHICLE_ERROR,
  UPDATE_FOLLOWING,
  GET_FOLLOWINGS,
  FOLLOWING_ERROR,
  UPDATE_BAN
} from '../actions/types';

const initialState = {
  profile: null,
  following: [],
  profiles: [],
  loading: true,
  user: null,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case GET_VEHICLE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_FOLLOWINGS:
      return {
        ...state,
        following: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case FOLLOWING_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        following: null
      };
    case VEHICLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case UPDATE_FOLLOWING:
      return {
        ...state,
        profile: state.profiles.map(profile =>
          profile._id === payload.id
            ? { ...profile, following: payload.following }
            : profile
        ),
        loading: false
      };
    case UPDATE_BAN:
      return {
        ...state,
        user: { ...state.user, banned: payload.banned },
        profile: {
          ...state.profile,
          user: { ...state.profile.user, banned: payload.banned }
        },
        loading: false
      };
    default:
      return state;
  }
}
