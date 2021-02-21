import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_GROUP,
  GET_GROUPS,
  ADD_GROUP,
  DELETE_GROUP,
  GROUP_ERROR,
  CLEAR_GROUP,
  UPDATE_MEMBERS
} from './types';

//Get groups
export const getGroups = () => async dispatch => {
  dispatch({ type: CLEAR_GROUP });
  try {
    const res = await axios.get('/api/group');

    dispatch({
      type: GET_GROUPS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Get groups
export const getMyGroups = () => async dispatch => {
  dispatch({ type: CLEAR_GROUP });
  try {
    const res = await axios.get('/api/group/myGroups/my');

    dispatch({
      type: GET_GROUPS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get group
export const getGroup = id => async dispatch => {
  try {
    const res = await axios.get(`/api/group/${id}`);
    dispatch({
      type: GET_GROUP,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete group
export const deleteGroup = id => async dispatch => {
  try {
    await axios.delete(`/api/group/${id}`);

    dispatch({
      type: DELETE_GROUP,
      payload: id
    });

    dispatch(setAlert('Group Removed', 'success'));
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add group
export const addGroup = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/group/', formData, config);

    dispatch({
      type: ADD_GROUP,
      payload: res.data
    });

    dispatch(setAlert('Group Created', 'success'));

    history.push('/groups');
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Add group member
export const addMember = id => async dispatch => {
  try {
    const res = await axios.put(`/api/group/members/${id}`);

    dispatch({
      type: UPDATE_MEMBERS,
      payload: { id, members: res.data }
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Remove group member
export const removeMember = id => async dispatch => {
  try {
    const res = await axios.put(`/api/group/leave/${id}`);

    dispatch({
      type: UPDATE_MEMBERS,
      payload: { id, members: res.data }
    });
  } catch (error) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Edit Group
export const editGroup = (groupId, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/group/${groupId}`, formData, config);

    dispatch({
      type: GET_GROUP,
      payload: res.data
    });

    dispatch(setAlert('Group Updated', 'success'));

    history.push('/groups');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: GROUP_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
