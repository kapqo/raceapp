import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import Moment from 'react-moment';
import {
  getEvent,
  addSure,
  addUnsure,
  removeSure,
  removeUnsure,
  deleteEvent
} from '../../actions/event';
import {
  Container,
  Grid,
  Segment,
  Label,
  Icon,
  Button,
  Modal,
  Comment
} from 'semantic-ui-react';
import Geocode from 'react-geocode';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete from 'use-places-autocomplete';

const Event = ({
  getEvent,
  getPosts,
  addSure,
  addUnsure,
  removeSure,
  removeUnsure,
  deleteEvent,
  event: { event, loading },
  auth: { user },
  post: { posts },
  match
}) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  //Show only posts of this event
  const result = posts.filter(post => post.type === match.params.id);

  <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCHvNcR5bgwTZIa6IMfudnOaNCR9xmXOwQ&libraries=places'></script>;

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const libraries = ['places'];

  const mapContainerStyle = {
    width: '47vw',
    height: '50vh'
  };

  const center = {
    lat: lat,
    lng: lng
  };
  const locationsMarker = [
    {
      location: {
        lat: lat,
        lng: lng
      }
    }
  ];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCHvNcR5bgwTZIa6IMfudnOaNCR9xmXOwQ',
    libraries
  });
  Geocode.setApiKey('AIzaSyCHvNcR5bgwTZIa6IMfudnOaNCR9xmXOwQ');
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const moveTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.moveTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  function exampleReducer(state, action) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { open: true, dimmer: action.dimmer };
      case 'CLOSE_MODAL':
        return { open: false };
      default:
        throw new Error();
    }
  }

  function Search({ moveTo }) {
    const [state, dispatch] = React.useReducer(exampleReducer, {
      open: false,
      dimmer: undefined
    });
    const { open, dimmer } = state;
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000
      }
    });

    return (
      <div>
        <Button
          icon
          onClick={async address => {
            const eventloc = event.location;

            try {
              await Geocode.fromAddress(eventloc).then(
                response => {
                  const { lat, lng } = response.results[0].geometry.location;

                  setLat(lat);
                  setLng(lng);
                },
                error => {
                  console.error(error);
                }
              );
            } catch (error) {
              console.log('😱 Error: ', error);
            }
            dispatch({ type: 'OPEN_MODAL' });
          }}
        >
          <Icon name='map marker alternate' />
        </Button>

        <Modal
          dimmer={dimmer}
          open={open}
          centered
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        >
          <Modal.Header>Location:</Modal.Header>
          <Modal.Content>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={18}
              center={center}
            >
              {locationsMarker.map(item => {
                return <Marker key={item.name} position={item.location} />;
              })}
            </GoogleMap>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  const addSureFn = id => {
    addSure(id).then(() => {
      getEvent(match.params.id);
    });
  };

  const addUnSureFn = id => {
    addUnsure(id).then(() => {
      getEvent(match.params.id);
    });
  };

  const removeSureFn = id => {
    removeSure(id).then(() => {
      getEvent(match.params.id);
    });
  };

  const removeUnsureFn = id => {
    removeUnsure(id).then(() => {
      getEvent(match.params.id);
    });
  };

  return loading || event === null || user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/events' className='ui grey button'>
        Back to events
      </Link>
      <Container>
        <Grid columns={'equal'} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>
                <b>Title:</b> {event.title}
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column width={5}>
              <Segment>
                <b>Organizer:</b>{' '}
                <Link to={`/profile/${event.organizer}`}>
                  <Label image>
                    <img src={event.avatar} />
                    {event.name}
                  </Label>
                </Link>
              </Segment>
              {event.organizer === user._id ? (
                <Button.Group>
                  <Link
                    to={`/edit-event/${event._id}`}
                    className='ui grey button'
                  >
                    Edit Event
                  </Link>
                  <Button.Or />
                  <Button color='red' onClick={e => deleteEvent(event._id)}>
                    Delete event
                  </Button>
                </Button.Group>
              ) : null}
              <Segment>
                <b>Date:</b> <Moment format='YYYY/MM/DD'>{event.date}</Moment>
                {event.time.length > 0 ? (
                  <div>
                    <b>Start:</b>
                    {' ' + event.time}
                  </div>
                ) : null}
              </Segment>
              <Segment textAlign='center'>
                <b>Location:</b>{' '}
                <Button as='div' floated='right' labelPosition='left'>
                  <Label as='a' basic pointing='right'>
                    {event.location}
                  </Label>
                  <Search moveTo={moveTo} />
                </Button>
              </Segment>
              <Segment textAlign='center'>
                <Label>
                  <Icon name='checkmark' color='green' />
                  Attending:{'  ' + event.sure.length}
                </Label>
                <Label>
                  <Icon name='question' color='yellow' />
                  Interested:{'  ' + event.unsure.length}
                </Label>
              </Segment>
              {event.sure.find(sure => sure.user === user._id) ? (
                <Button color='red' onClick={e => removeSureFn(event._id)}>
                  Leave
                </Button>
              ) : event.unsure.find(unsure => unsure.user === user._id) ? (
                <Button color='red' onClick={e => removeUnsureFn(event._id)}>
                  Leave
                </Button>
              ) : (
                <Button.Group>
                  <Button color='green' onClick={e => addSureFn(event._id)}>
                    I'am in!
                  </Button>
                  <Button.Or />
                  <Button color='yellow' onClick={e => addUnSureFn(event._id)}>
                    I'am interested
                  </Button>
                </Button.Group>
              )}
            </Grid.Column>
            <Grid.Column>
              <Segment>{event.description}</Segment>
            </Grid.Column>
          </Grid.Row>
          <Container>
            <PostForm id={event._id} />
            <Comment.Group size='massive'>
              {result.map(post => (
                <PostItem key={post._id} post={post} />
              ))}
            </Comment.Group>
          </Container>
        </Grid>
      </Container>
    </Fragment>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addUnsure: PropTypes.func.isRequired,
  addSure: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  removeUnsure: PropTypes.func.isRequired,
  removeSure: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, {
  getEvent,
  getPosts,
  addSure,
  addUnsure,
  removeSure,
  removeUnsure,
  deleteEvent
})(Event);
