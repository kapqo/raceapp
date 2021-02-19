import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Dropdown, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  followUser,
  unfollowUser,
  banUser,
  unbanUser
} from '../../actions/profile';
import { addChat } from '../../actions/chat';
import { Link } from 'react-router-dom';

const ProfileTop = ({
  followUser,
  unfollowUser,
  profileId,
  followingg,
  getFollowingFunction,
  userId,
  userAdmin,
  banUser,
  unbanUser,
  addChat,
  profileThat: {
    location,
    social,
    user: { name, avatar, _id, banned },
    following
  }
}) => {
  const result = followingg.filter(following => following.user === _id);

  const user2 = profileId;

  const followingOption = following.map(following => ({
    key: following._id,
    text: following.name,
    image: { avatar: true, src: following.avatar },
    value: following.user
  }));

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
      <div style={{ display: 'flex' }}>
        {userId !== profileId && (
          <div>
            {result.length > 0 ? (
              <Button
                animated='vertical'
                color='red'
                onClick={e => unfollowFn(profileId)}
              >
                <Button.Content visible>Unfollow</Button.Content>
                <Button.Content hidden>
                  <Icon name='user times' />
                </Button.Content>
              </Button>
            ) : (
              <Button
                animated='vertical'
                color='green'
                onClick={e => followFn(profileId)}
              >
                <Button.Content visible>Follow</Button.Content>
                <Button.Content hidden>
                  <Icon name='user plus' />
                </Button.Content>
              </Button>
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
        <Button
          animated='vertical'
          color='yellow'
          onClick={e => addChat({ user2 })}
        >
          <Button.Content visible>Create chat with user</Button.Content>
          <Button.Content hidden>
            <Icon name='send' />
          </Button.Content>
        </Button>
        {following.length > 0 && (
          <Button.Group color='grey'>
            <Button>
              {name} follows: {following.length} users
            </Button>

            <Dropdown
              className='button icon'
              floating
              trigger={<></>}
              options={followingOption}
            >
              <Dropdown.Menu>
                {followingOption.map(option => (
                  <Link to={`/profile/${option.value}`}>
                    <div className='m-1'>
                      <Dropdown.Item key={option.value} {...option} />
                    </div>
                  </Link>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Button.Group>
        )}
      </div>

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
