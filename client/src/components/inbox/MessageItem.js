import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Comment, Divider } from 'semantic-ui-react';

const MessageItem = ({ message, auth, user1, user2 }) => {
  return (
    <Fragment>
      <Comment>
        {message.sender === user1._id ? (
          <Comment.Avatar src={user1.avatar} />
        ) : (
          <Comment.Avatar src={user2.avatar} />
        )}

        <Comment.Content>
          {message.sender === user1._id ? (
            <Comment.Author as='a'>{user1.name}</Comment.Author>
          ) : (
            <Comment.Author as='a'>{user2.name}</Comment.Author>
          )}

          <Comment.Metadata>
            <div>
              Sended <Moment fromNow>{message.date}</Moment>
            </div>
          </Comment.Metadata>
          <Comment.Text>{message.text}</Comment.Text>
        </Comment.Content>
      </Comment>
      <Divider></Divider>
    </Fragment>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(MessageItem);
