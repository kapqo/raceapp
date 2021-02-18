import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { getChat } from '../../actions/chat';
import { Comment, Form, Header, Button } from 'semantic-ui-react';
import MessageItem from './MessageItem';

const ChatConv = ({ getChat, auth, chat: { chat, loading }, match }) => {
  useEffect(() => {
    getChat(match.params.id);
  }, [getChat, match.params.id]);

  console.log(chat);

  return loading || chat === null ? (
    <Spinner />
  ) : (
    <div className='conv'>
      <Comment.Group size='big'>
        <Header dividing>Chat</Header>
        {chat.messages.length > 0 ? (
          chat.messages.map(message => (
            <MessageItem
              key={message._id}
              message={message}
              user1={chat.user1}
              user2={chat.user2}
            />
          ))
        ) : (
          <h4>No messages yet</h4>
        )}
        <Form reply>
          <Form.TextArea />
          <Button
            content='Send message'
            labelPosition='left'
            icon='send'
            floated='right'
            primary
          />
        </Form>
      </Comment.Group>
    </div>
  );
};

ChatConv.propTypes = {
  getChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  auth: state.auth
});

export default connect(mapStateToProps, { getChat })(ChatConv);
