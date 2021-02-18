import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMyChats } from '../../actions/chat';
import { Segment, Header, Icon, Button, Grid } from 'semantic-ui-react';
import ChatItem from './ChatItem';

const Inbox = ({ getMyChats, chat: { chats, loading }, auth: { user } }) => {
  useEffect(() => {
    getMyChats();
  }, [getMyChats]);

  return (
    <Fragment>
      <Header as='h2' icon textAlign='center'>
        <Icon name='chat' circular />
        <Header.Content>Your chats</Header.Content>
      </Header>
      <Grid columns={1} divided>
        <Grid.Row>
          <Grid.Column width={16} textAlign='center'>
            {loading ? (
              <Spinner />
            ) : (
              <>
                {chats.length > 0 ? (
                  chats.map(chat => <ChatItem key={chat._id} chat={chat} />)
                ) : (
                  <h4>No chats found</h4>
                )}
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

Inbox.propTypes = {
  getMyChats: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  auth: state.auth
});

export default connect(mapStateToProps, { getMyChats })(Inbox);
