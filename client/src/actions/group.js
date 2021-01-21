import axios from 'axios'
import { setAlert } from './alert'
import {
    GET_GROUP,
    GET_GROUPS,
    ADD_GROUP,
    DELETE_GROUP,
    GROUP_ERROR
} from './types';

//Get groups
export const getGroups = () => async dispatch => {
    try {
        const res = await axios.get('/api/group');

        dispatch({
            type: GET_GROUPS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GROUP_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}



// Get group
export const getGroup = id => async dispatch => {
    try {
        const res = await axios.get(`/api/group/${id}`);

        dispatch({
            type: GET_GROUP,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GROUP_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Delete group
export const deleteGroup = id => async dispatch => {
    try {
        await axios.delete(`/api/group/${id}`);

        dispatch({
            type: DELETE_GROUP,
            payload: id
        })

        dispatch(setAlert('Group Removed', 'success'))
    } catch (error) {
        dispatch({
            type: GROUP_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add group
export const addGroup = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/group/', formData, config);

        dispatch({
            type: ADD_GROUP,
            payload: res.data
        })

        dispatch(setAlert('Group Created', 'success'))
    } catch (error) {
        dispatch({
            type: GROUP_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}