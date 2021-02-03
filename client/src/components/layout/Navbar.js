import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile';
import { Icon, Label } from 'semantic-ui-react';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Users</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/groups'>Groups</Link>
      </li>
      <li>
        <Link to='/events'>Events</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/'>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-sm'>Log out</span>
          </a>
        </Link>
      </li>
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
        <Link to='/register'>Sing Up</Link>
      </li>
      <li>
        <Link to='/login'>Log In</Link>
      </li>
      <li>
        <Link to='#!'>About us</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-car'></i> Raceapp
        </Link>
      </h1>
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
