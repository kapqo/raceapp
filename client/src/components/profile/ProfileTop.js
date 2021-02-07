import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/profile';

const ProfileTop = ({
  followUser,
  unfollowUser,
  profileId,
  profileThat: {
    location,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className='profile-top bg-custom p-2'>
      <Button.Group>
        <Button onClick={e => followUser(profileId)}>Follow</Button>
        <Button onClick={e => unfollowUser(profileId)}>Unfollow</Button>
      </Button.Group>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>{location && <span>{location}</span>}</p>
      <div className='icons my-1'>
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  followUser,
  unfollowUser
})(ProfileTop);
