import {
    GET_GROUP,
    GET_GROUPS,
    ADD_GROUP,
    DELETE_GROUP,
    GROUP_ERROR
} from '../actions/types';

const initialState = {
    groups: [],
    group: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: payload,
                loading: false
            }
            case GET_GROUP:
                return {
                    ...state,
                    group: payload,
                    loading: false
                }
            case ADD_GROUP:
                return {
                    ...state,
                    groups: [payload, ...state.groups],
                    loading: false
                }
            case DELETE_GROUP:
                return {
                    ...state,
                    groups: state.groups.filter(group => group._id !== payload),
                    loading: false
                }
            case GROUP_ERROR:
                return {
                    ...state,
                    error: payload,
                    loading: false
                }
        default:
            return state;
    }
}