import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import { Card, Input, Header, Icon, Container } from 'semantic-ui-react';
import Pages from './Pages';

const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [name, setName] = useState('');
  const [inp, setInp] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = profiles.slice(indexOfFirstUser, indexOfLastUser);

  let names = profiles.filter(profile =>
    profile.user.name.toLowerCase().includes(inp.toLowerCase())
  ).slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Header as='h1' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>Raceapp Users</Header.Content>
          </Header>
          <Header as='h3' textAlign='center'>
            <p>Browse and connect with users</p>
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
          </Header>
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
      <Pages
        usersPerPage={usersPerPage}
        totalUsers={profiles.length}
        paginate={paginate}
      />
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
