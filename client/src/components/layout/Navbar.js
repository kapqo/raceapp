import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Image, Label } from 'semantic-ui-react';
import logo from './logoWhite.png';

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  getNotifications,
  notifications
}) => {
  const authLinks = (
    <ul>
      <li>
        {user !== null ? (
          <Link to={`/profile/${user._id}`} className='hide-sm'>
            <Label image>
              <img src={user.avatar} />
              {user.name}
            </Label>
          </Link>
        ) : null}
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='#!'>About us</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <img
        src={logo}
        style={{
          height: '40px',
          width: '220px'
        }}
      />

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
