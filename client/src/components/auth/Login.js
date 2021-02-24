import React, { Fragment, useState, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Register from '../auth/Register';
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

const Login = ({ login, isAuthenticated }) => {
  const [state, dispatch] = useReducer(exampleReducer, {
    open: false,
    dimmer: undefined
  });
  const { open, dimmer } = state;

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  //Rediredt if loged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Button
        onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
        inverted
        color='green'
      >
        Log In
      </Button>
      <Modal
        dimmer={dimmer}
        open={open}
        size='tiny'
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Modal.Header>
          <Header textAlign='center'>Sign In</Header>
        </Modal.Header>
        <Modal.Content>
          <Segment textAlign='center'>
            <p className='lead'>Sign Into Your Account</p>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  minLength='6'
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <Modal.Actions>
                <button type='submit' className='ui primary button'>
                  Log In
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
            <p className='my-1'>Don't have an account? </p>
            <Register />
          </Segment>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
