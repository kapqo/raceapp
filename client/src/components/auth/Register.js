import React, { Fragment, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Login from '../auth/Login';
import { Button, Modal, Header, Segment, Divider } from 'semantic-ui-react';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer };
    case 'CLOSE_MODAL':
      return { open: false };
    default:
      throw new Error();
  }
}

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [state, dispatch] = useReducer(exampleReducer, {
    open: false,
    dimmer: undefined
  });
  const { open, dimmer } = state;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Button
        onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
        inverted
        color='blue'
      >
        Sign Up
      </Button>
      <Modal
        dimmer={dimmer}
        open={open}
        size='tiny'
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Modal.Header>
          <Header textAlign='center'>Sign Up</Header>
        </Modal.Header>
        <Modal.Content>
          <Segment textAlign='center'>
            <p className='lead'>
              <i></i> Create Your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={name}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={e => onChange(e)}
                />
              </div>
              <Modal.Actions>
                <button type='submit' className='ui primary button'>
                  Sign Up
                </button>
                <Button
                  negative
                  onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                >
                  Go back
                </Button>
              </Modal.Actions>
            </form>
            <Divider />
            <p className='my-1'>Already have an account? </p>
            <Login />
          </Segment>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
