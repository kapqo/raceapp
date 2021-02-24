import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Icon,
  Modal,
  Grid,
  Header,
  Segment,
  Comment
} from 'semantic-ui-react';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';
import { getPosts } from '../../actions/post';
import Image from 'react-image-enlarger';

const ProfileVehicle = ({
  vehicle: { _id, brand, model, engine, hp, fuel, year, description, photo },
  getPosts,
  post: { posts },
  profileId,
  authId
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [zoomed, setZoomed] = React.useState(false);

  //Show only posts of this vehicle
  const result = posts.filter(post => post.type === _id);

  const [open, setOpen] = useState(false);
  return (
    <div className='veh-grid'>
      <div>
        <h3 className='textcustomdarkk'>
          {brand} {model}
        </h3>
        <p>
          <strong>Year: </strong> {year}
        </p>
        <p>
          <strong>Engine: </strong> {engine}
        </p>
      </div>
      <div className='photo-veh'>
        <Image
          style={{ width: 'auto', height: 'auto' }}
          zoomed={zoomed}
          src={photo}
          onClick={() => setZoomed(true)}
          onRequestClose={() => setZoomed(false)}
        ></Image>
      </div>
      <div>
        <p>
          <Fragment>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              trigger={<Button>Show more!</Button>}
            >
              <Modal.Header>Specs and disscusion</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Grid columns='equal' divided>
                    <Grid.Row stretched>
                      <Grid.Column>
                        {photo !== '' ? (
                          <Image size='medium' src={photo} wrapped />
                        ) : (
                          <Segment placeholder>
                            <Header icon>
                              <Icon name='image outline' />
                              No images uploaded for this vehicle.
                            </Header>
                            {profileId === authId ? (
                              <Button primary>Add Photo</Button>
                            ) : null}
                          </Segment>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <Header as='h1'>Brand: {brand}</Header>
                        <Header as='h2'>Model: {model}</Header>
                        <Header as='h3'>Year: {year}</Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Header as='h3'>Engine: {engine}</Header>
                        <Header as='h3'>HP: {hp}</Header>
                        <Header as='h3'>Fuel: {fuel}</Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Segment>
                          <Header as='h2'>Description: </Header>
                          <p>{description}</p>
                          {profileId === authId ? (
                            <PostForm id={_id} Buttontxt={'Add update'} />
                          ) : null}
                          <Comment.Group size='massive'>
                            {result.map(post => (
                              <PostItem key={post._id} post={post} />
                            ))}
                          </Comment.Group>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button primary onClick={() => setOpen(false)}>
                  Close <Icon name='right chevron' />
                </Button>
              </Modal.Actions>
            </Modal>
          </Fragment>
        </p>
      </div>
    </div>
  );
};

ProfileVehicle.propTypes = {
  vehicle: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(ProfileVehicle);
