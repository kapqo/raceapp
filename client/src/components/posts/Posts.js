import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { getCurrentProfile } from '../../actions/profile';

const Posts = ({
  getPosts,
  post: { posts, loading },
  auth: { user },
  getCurrentProfile,
  profile: { profile }
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const result = posts.filter(
    post =>
      (post.type === '' &&
        profile.following.find(follow => follow.user === post.user)) ||
      (post.user === user._id && post.type === '')
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large textcustom'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community
      </p>
      <PostForm id={''} />
      <div className='posts'>
        {result.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
