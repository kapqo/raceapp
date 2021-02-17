import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  followUser,
  unfollowUser,
  banUser,
  unbanUser
} from '../../actions/profile';
import { addChat } from '../../actions/chat';

const ProfileTop = ({
  followUser,
  unfollowUser,
  profileId,
  following,
  getFollowingFunction,
  userId,
  userAdmin,
  banUser,
  unbanUser,
  addChat,
  profileThat: {
    location,
    social,
    user: { name, avatar, _id, banned }
  }
}) => {
  const result = following.filter(following => following.user === _id);

  const followFn = id => {
    followUser(id).then(() => {
      getFollowingFunction();
    });
  };

  const unfollowFn = id => {
    unfollowUser(id).then(() => {
      getFollowingFunction();
    });
  };

  return (
    <div className='profile-top bg-custom p-2'>
      {userId !== profileId && (
        <div>
          {result.length > 0 ? (
            <Button onClick={e => unfollowFn(profileId)}>Unfollow</Button>
          ) : (
            <Button onClick={e => followFn(profileId)}>Follow</Button>
          )}
        </div>
      )}
      {userAdmin && (
        <div className='my-1'>
          {banned ? (
            <Button positive onClick={e => unbanUser(profileId)}>
              Unban User
            </Button>
          ) : (
            <Button negative onClick={e => banUser(profileId)}>
              Ban User
            </Button>
          )}
        </div>
      )}
      <Button onClick={e => addChat(profileId)}>Create chat with user</Button>

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
  unfollowUser: PropTypes.func.isRequired,
  banUser: PropTypes.func.isRequired,
  unbanUser: PropTypes.func.isRequired,
  addChat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  followUser,
  unfollowUser,
  banUser,
  unbanUser,
  addChat
})(ProfileTop);
