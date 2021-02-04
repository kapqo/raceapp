import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { getCurrentProfile } from '../../actions/profile';
import { Comment, Header } from 'semantic-ui-react';

const Posts = ({
  getPosts,
  post: { posts, loading },
  auth: { user },
  getCurrentProfile,
  profile: { profile }
}) => {
  useEffect(() => {
    getPosts().then(() => {
      getCurrentProfile();
    });
  }, [getPosts, getCurrentProfile]);

  const result = profile
    ? posts.filter(
        post =>
          (post.type === '' &&
            profile.following.find(follow => follow.user === post.user)) ||
          (post.user === user._id && post.type === '')
      )
    : [];

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header as='h2'>Your wall</Header>
      <PostForm id={''} />
      <Comment.Group size='massive'>
        {result.map(post => (
          //<Segment size='huge' raised>
          <PostItem key={post._id} post={post} />
          //</Segment>
        ))}
      </Comment.Group>
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
