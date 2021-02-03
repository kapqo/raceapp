import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileVehicle from './ProfileVehicle.js';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || auth.user === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btncustomlight'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btncustom'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} profileId={profile.user._id} />
            <ProfileAbout profile={profile} />
            <div className='profile-veh bg-white p-2'>
              <h2 className='textcustom'>Vehicle</h2>
              {profile.vehicle.length > 0 ? (
                <Fragment>
                  {profile.vehicle.map(vehicle => (
                    <ProfileVehicle
                      key={vehicle._id}
                      vehicle={vehicle}
                      profileId={profile?.user?._id}
                      authId={auth.user._id}
                    ></ProfileVehicle>
                  ))}
                </Fragment>
              ) : (
                <h4>No vehicle added</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
