import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getEvents } from '../../actions/event';
import { Item, Header, Icon } from 'semantic-ui-react';
import EventItem from './EventItem';

const Events = ({ getEvents, event: { events, loading } }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header as='h2' icon textAlign='center'>
        <Icon name='flag checkered' circular />
        <Header.Content>Events</Header.Content>
      </Header>
      <Item.Group divided>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {events.length > 0 ? (
              events.map(event => <EventItem key={event._id} event={event} />)
            ) : (
              <h4>No events found</h4>
            )}
          </Fragment>
        )}
      </Item.Group>
    </Fragment>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvents })(Events);