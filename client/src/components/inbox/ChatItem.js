import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Label, Dimmer, Loader, Segment } from 'semantic-ui-react';

const ChatItem = ({ chat, auth }) => {
  return (
    <Fragment>
      {auth.user._id === chat.user1._id ? (
        <Segment.Group horizontal>
          <Link to={`/chatconv/${chat.user2._id}`}>
            <Label as='a' size='big' style={{ margin: '5px' }}>
              <Image avatar spaced='right' src={chat.user2.avatar} />
              {chat.user2.name}
            </Label>
          </Link>
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Click on user to see chat</Loader>
            </Dimmer>
          </Segment>
        </Segment.Group>
      ) : (
        <Segment.Group horizontal>
          <Link to={`/chatconv/${chat.user1._id}`}>
            <Label as='a' size='big' style={{ margin: '5px' }}>
              <Image avatar spaced='right' src={chat.user1.avatar} />
              {chat.user1.name}
            </Label>
          </Link>
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Click on user to see chat</Loader>
            </Dimmer>
          </Segment>
        </Segment.Group>
      )}
    </Fragment>
  );
};

ChatItem.propTypes = {
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(ChatItem);
