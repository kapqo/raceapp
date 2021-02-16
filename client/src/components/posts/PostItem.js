import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { Button, Comment, Icon, Label, Segment } from 'semantic-ui-react';

const PostItem = ({
  addLike,
  removeLike,
  auth,
  deletePost,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => (
  <Segment raised size='huge'>
    <Comment>
      <Comment.Avatar src={avatar} />
      <Comment.Content>
        <Link to={`/profile/${user}`}>
          <Comment.Author as='a'>{name}</Comment.Author>
        </Link>
        <Comment.Metadata>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
        <Comment.Actions>
          {showActions && (
            <Fragment>
              <Comment.Action>
                <Link to={`/posts/${_id}`}>
                  <Button as='div' labelPosition='right'>
                    <Button color='green' basic>
                      <Icon name='reply'></Icon>
                      Reply
                    </Button>
                    <Label as='a' basic color='green' pointing='left'>
                      <span class='comment-count'>{comments.length}</span>
                    </Label>
                  </Button>
                </Link>
              </Comment.Action>
              <Comment.Action>
                <Button as='div' labelPosition='right'>
                  <Button color='red' onClick={e => addLike(_id)}>
                    <Icon name='heart' />
                    Like
                  </Button>
                  <Label as='a' basic color='red' pointing='left'>
                    <span class='comment-count'>{likes.length}</span>
                  </Label>
                </Button>

                <Button color='grey' onClick={e => removeLike(_id)}>
                  <Icon name='x' />
                  Unlike
                </Button>
              </Comment.Action>
              <Comment.Action>
                {(!auth.loading && user === auth.user._id) ||
                auth.user.admin ? (
                  <Button color='red' inverted onClick={e => deletePost(_id)}>
                    <Icon name='trash alternate' />
                    Delete post
                  </Button>
                ) : null}
              </Comment.Action>
            </Fragment>
          )}
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </Segment>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
