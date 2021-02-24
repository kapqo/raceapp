import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Sidebar = ({ auth: { user }, logout }) => {
  return (
    <div className='sticky'>
      <Button.Group basic vertical style={{ width: '15vw' }}>
        <Link to='/dashboard'>
          <Button textAlign='center' size='huge' icon labelPosition='left'>
            <Icon name='dashboard' />
            <span className='hide-sm'>Dashboard</span>
          </Button>
        </Link>
        {user !== null ? (
          <Link to={`/profile/${user._id}`}>
            <Button textAlign='center' size='huge' icon labelPosition='left'>
              <Icon name='user circle' />
              <span className='hide-sm'>My Profile</span>
            </Button>
          </Link>
        ) : null}
        <Link to='/posts'>
          <Button textAlign='center' size='huge' icon labelPosition='left'>
            <Icon name='feed' />
            <span className='hide-sm'>Posts</span>
          </Button>
        </Link>
        <Link to='/profiles'>
          <Button textAlign='center' size='huge' icon labelPosition='left'>
            <Icon name='users' />
            <span className='hide-sm'>Users</span>
          </Button>
        </Link>
        <Link to='/inbox'>
          <Button textAlign='center' size='huge' icon labelPosition='left'>
            <Icon name='chat' />
            <span className='hide-sm'>Inbox</span>
          </Button>
        </Link>
        <Link to='/groups'>
          <Button textAlign='center' size='huge' icon labelPosition='left'>
            <Icon name='car' />
            <span className='hide-sm'>Groups</span>
          </Button>
        </Link>
        <Link to='/events'>
          <Button textAlign='center' size='huge' icon labelPosition='left'>
            <Icon name='flag checkered' />
            <span className='hide-sm'>Events</span>
          </Button>
        </Link>

        <Button
          textAlign='center'
          size='huge'
          icon
          labelPosition='left'
          onClick={logout}
        >
          <Icon name='log out' />
          <span className='hide-sm'>Logout</span>
        </Button>
      </Button.Group>
    </div>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Sidebar);
