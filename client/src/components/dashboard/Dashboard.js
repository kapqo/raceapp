import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Vehicle from './Vehicle';
import NotificationItem from './NotificationItem';
import DashboardActions from './DashboardActions';
import {
  Button,
  Icon,
  Header,
  Container,
  Segment,
  Feed
} from 'semantic-ui-react';
import { getNotifications } from '../../actions/notification';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
  getNotifications,
  notification: { notifications }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const result = profile
    ? notifications.filter(notification =>
        profile.following.find(follow => follow.user === notification.user._id)
      )
    : [];

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header as='h1' icon textAlign='center'>
        <Icon name='dashboard' circular />
        <Header.Content>Dashboard</Header.Content>
      </Header>
      <Header as='h2' textAlign='center'>
        <Icon name='user circle' />
        Welcome {user && user.name}!
      </Header>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {profile.vehicle.length > 0 ? (
            <Vehicle vehicle={profile.vehicle} />
          ) : (
            <Segment textAlign='center'>No vehicle added</Segment>
          )}
          <Header>Activity feed</Header>
          <Feed>
            {result.map(notification => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}
          </Feed>

          <div className='my-2'>
            <Button
              negative
              icon
              labelPosition='left'
              onClick={() => deleteAccount()}
            >
              <Icon name='remove user' /> Delete my account
            </Button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Container>
            <div style={{ textAlign: 'center' }}>
              <Header>
                You have not setup a profile, please add some info
              </Header>
              <Link to='/create-profile' className='ui green button'>
                <Icon name='add' />
                Create Profile
              </Link>
            </div>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  notification: state.notification
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getNotifications
})(Dashboard);
