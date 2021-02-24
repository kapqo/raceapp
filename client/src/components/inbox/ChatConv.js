import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getChat, sendMessage } from '../../actions/chat';
import { Comment, Form, Header, Button } from 'semantic-ui-react';
import MessageItem from './MessageItem';

const ChatConv = ({
  getChat,
  sendMessage,
  auth,
  chat: { chat, loading },
  match
}) => {
  useEffect(() => {
    getChat(match.params.id);
  }, [getChat, match.params.id]);

  const [text, setText] = useState('');

  return loading || chat === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header dividing>Chat</Header>
      <div className='conv'>
        <Comment.Group size='big'>
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
        </Comment.Group>
      </div>
      <Form
        onSubmit={e => {
          e.preventDefault();
          sendMessage(chat._id, { text }).then(getChat(match.params.id));
          setText('');
        }}
      >
        <p>
          <textarea
            name='text'
            cols='30'
            rows='4'
            placeholder='...'
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
        </p>
        <Button
          type='submit'
          content='Send message'
          labelPosition='left'
          icon='send'
          floated='right'
          primary
        />
      </Form>
    </Fragment>
  );
};

ChatConv.propTypes = {
  getChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  auth: state.auth
});

export default connect(mapStateToProps, { getChat, sendMessage })(ChatConv);
