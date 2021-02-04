import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import { Comment } from 'semantic-ui-react';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='ui green button'>
        Back to posts
      </Link>
      <Comment.Group size='massive'>
        <PostItem post={post} showActions={true} />
      </Comment.Group>
      <CommentForm postId={post._id} />
      <Comment.Group size='massive'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </Comment.Group>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
