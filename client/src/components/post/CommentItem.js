import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { Segment, Comment, Button, Icon } from 'semantic-ui-react';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
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
          {!auth.loading && user === auth.user._id && (
            <Button
              color='red'
              inverted
              onClick={e => deleteComment(postId, _id)}
            >
              <Icon name='trash alternate' />
              Delete
            </Button>
          )}
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </Segment>
);

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
