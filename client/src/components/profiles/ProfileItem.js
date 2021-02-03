import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Button, Image, Label, Divider } from 'semantic-ui-react';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    interests,
    bio
  }
}) => {
  return (
    <Card>
      <Image src={avatar} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{location && <span>{location}</span>}</Card.Meta>
        <Card.Description>{bio}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign='center'>
        {interests.slice(0, 4).map((interest, index) => (
          <Label key={index}>
            <i className='fas fa-check'></i> {interest}
          </Label>
        ))}
      </Card.Content>
      <Link to={`/profile/${_id}`} className='ui green button'>
        Show Profile
      </Link>
    </Card>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
