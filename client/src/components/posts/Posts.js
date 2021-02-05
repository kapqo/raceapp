import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { getCurrentProfile } from '../../actions/profile';
import { Comment, Header, Icon } from 'semantic-ui-react';
import Pages from './Pages';

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

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const result = profile
    ? currentPosts.filter(
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
      <Header as='h1' icon textAlign='center'>
        <Icon name='feed' circular />
        <Header.Content>Your wall</Header.Content>
      </Header>

      <PostForm id={''} />
      <Comment.Group size='massive'>
        {result.map(post => (
          //<Segment size='huge' raised>
          <PostItem key={post._id} post={post} />
          //</Segment>
        ))}
      </Comment.Group>
      <Pages
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
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
