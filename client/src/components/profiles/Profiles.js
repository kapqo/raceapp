import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import { Card, Input } from 'semantic-ui-react';

const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [name, setName] = useState('');
  const [inp, setInp] = useState('');

  let names = profiles.filter(profile =>
    profile.user.name.toLowerCase().includes(inp.toLowerCase())
  );

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large textcustom'>Users</h1>
          <p className='lead'>
            <i className='fas fa-flag-checkered'>
              {' '}
              Browse and connect with users
            </i>
          </p>
          <p>
            <Input
              icon='users'
              iconPosition='left'
              placeholder='Search users...'
              onChange={e => {
                let input = e.target.value;
                setName(input);
                setInp(input);
              }}
            />
          </p>
          <Card.Group itemsPerRow='4'>
            {profiles.length > 0 ? (
              names.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found</h4>
            )}
          </Card.Group>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profile);
