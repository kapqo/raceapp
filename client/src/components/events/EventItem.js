import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Item, Label, Icon } from 'semantic-ui-react';

const EventItem = ({
  auth,
  event: { _id, title, location, date, organizer, description, sure, unsure }
}) => {
  return (
    <Fragment>
      <Item>
        <Item.Content>
          <Item.Header>
            {title + ' '}
            <Label tag color='pink'>
              <Moment format='YYYY/MM/DD'>{date}</Moment>
            </Label>
          </Item.Header>
          <Item.Meta>{location + ' '}</Item.Meta>
          <Item.Description>{description}</Item.Description>
          <Item.Extra>
            <Label>
              <Icon name='checkmark' />
              Attending:{'  ' + sure.length}
            </Label>
            <Label>
              <Icon name='question' />
              Interested:{'  ' + unsure.length}
            </Label>
            <Link
              to={`/events/${_id}`}
              className='ui right floated primary button'
            >
              Show more
              <Icon name='chevron right' />
            </Link>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Fragment>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(EventItem);
