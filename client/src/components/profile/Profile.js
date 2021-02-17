import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileVehicle from './ProfileVehicle.js';
import { getProfileById } from '../../actions/profile';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { getCurrentFollowings } from '../../actions/profile';

const Profile = ({
  getProfileById,
  profile: { profile, loading, following },
  auth: { user, isAuthenticated },
  match,
  getCurrentFollowings
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  useEffect(() => {
    getCurrentFollowings();
  }, [getCurrentFollowings]);

  return (
    <Fragment>
      {profile === null || user === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='ui button'>
            <Icon name='reply' />
            Back To Profiles
          </Link>
          {isAuthenticated &&
            loading === false &&
            user._id === profile.user._id && (
              <Link to='/edit-profile' className='ui grey button'>
                <Icon name='edit' />
                Edit Profile
              </Link>
            )}
          {user.admin || profile.user.banned === false ? (
            <div class='profile-grid my-1'>
              <ProfileTop
                profileThat={profile}
                profileId={profile.user._id}
                following={following}
                getFollowingFunction={getCurrentFollowings}
                userId={user._id}
                userAdmin={user.admin}
              />
              <ProfileAbout profile={profile} />
              <div className='profile-veh bg-white p-2'>
                <h2 className='textcustomdark'>Vehicle</h2>
                {profile.vehicle.length > 0 ? (
                  <Fragment>
                    {profile.vehicle.map(vehicle => (
                      <ProfileVehicle
                        key={vehicle._id}
                        vehicle={vehicle}
                        profileId={profile?.user?._id}
                        authId={user._id}
                      ></ProfileVehicle>
                    ))}
                  </Fragment>
                ) : (
                  <h4>No vehicle added</h4>
                )}
              </div>
            </div>
          ) : (
            <Segment textAlign='center'>
              <Header>User banned</Header>
            </Segment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentFollowings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  following: state.following
});

export default connect(mapStateToProps, {
  getProfileById,
  getCurrentFollowings
})(Profile);
