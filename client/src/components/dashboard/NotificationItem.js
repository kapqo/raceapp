import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Feed, Header } from 'semantic-ui-react';

const NotificationItem = ({ notification: { user, text, date, link } }) => {
  let datenow = Date.now();
  let duration = datenow - Date.parse(date);

  return (
    <Fragment>
      {duration < 172800000 && (
        <Feed.Event>
          <Feed.Label>
            <Link to={`/profile/${user._id}`}>
              <img src={user.avatar} />
            </Link>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>
                <Link to={`/profile/${user._id}`}>{user.name}</Link>
              </Feed.User>{' '}
              {text}{' '}
              {link ? (
                <a href={link}>here</a>
              ) : (
                <Link to={`/profile/${user._id}`}>here</Link>
              )}
              <Feed.Date>
                <Moment fromNow>{date}</Moment>
              </Feed.Date>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      )}
    </Fragment>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

export default NotificationItem;
