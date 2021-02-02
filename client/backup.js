import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import {
  getProfileById,
  addLikeP,
  removeLikeP,
  banUser,
  unbanUser
} from '../../actions/profile';
import ProfileComments from './ProfileComments';
import ProfileCommentsForm from './ProfileCommentsForm';
import Geocode from 'react-geocode';
import { googleMap, MarkerOptions } from 'react-google-maps';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

<script src='https://unpkg.com/axios/dist/axios.min.js'></script>;

const Profile = ({
  addLikeP,
  removeLikeP,
  getProfileById,
  banUser,
  unbanUser,
  profile: { profile, loading, _id, likes, location, unlikes },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [likeerr, setLikeErr] = useState('');
  const [markers, setMarkers] = useState([]);

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
    googleMapsApiKey: 'nic',
    libraries
  });
  Geocode.setApiKey('nic');
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
  //const lokalizacja = profile.location;
  //console.log("Lokalizacja:", profile.location);

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

  function submitButtonStyle(_this) {
    _this.style.backgroundColor = 'red';
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
      <div className='searchbtn'>
        <Button
          onClick={async address => {
            const profloc = profile.location;

            try {
              const xd = await Geocode.fromAddress(profloc).then(
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
          Pokaż lokalizację
        </Button>

        <Modal
          dimmer={dimmer}
          open={open}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        >
          <Modal.Header>Lokalizacja</Modal.Header>
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
              Zamknij
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  return (
    <Fragment Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-ligth'>
            Przeglądaj wszystkie profile
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user?._id === profile.user?._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edytuj profil
              </Link>
            )}

          {(auth.user ? auth.user.admin === 'true' : false) &&
            (profile.user ? profile.user.ban === 'false' : false) && (
              <button
                onClick={e => banUser(profile.user?._id)}
                type='button'
                class='btn btn-danger'
              >
                <i class='fas fa-ban'> Zablokuj</i>
              </button>
            )}

          {(auth.user ? auth.user.admin === 'true' : false) &&
            (profile.user ? profile.user.ban === 'true' : false) && (
              <button
                onClick={e => unbanUser(profile.user?._id)}
                type='button'
                class='btn btn-success'
              >
                <i class='fas fa-check'> Odblokuj</i>
              </button>
            )}

          <div>
            <Search moveTo={moveTo} />
            {/* <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={14}
                        center={center}
                    ></GoogleMap> */}
          </div>

          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Doświadczenie</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4> Nie podano informacji o poprzednich miejscach pracy. </h4>
              )}
            </div>
          </div>

          {
            <Fragment>
              <div className='likerr'>{likeerr}</div>

              <a className='likeuser'>Czy ten użytkownik Ci pomógł?</a>

              <button
                onClick={e => {
                  (auth.user ? auth.user.ban === 'false' : false) &&
                    addLikeP(profile._id);
                }}
                type='button'
                class='btn btn-light'
              >
                <i class='fas fa-thumbs-up'></i>{' '}
                {profile.likes.length > 0 && (
                  <span>{profile.likes.length}</span>
                )}
              </button>
              <button
                onClick={e => {
                  (auth.user ? auth.user.ban === 'false' : false) &&
                    removeLikeP(profile._id);
                }}
                type='button'
                class='btn btn-light'
              >
                <i class='fas fa-thumbs-down'></i>
                {profile.unlikes.length > 0 && (
                  <span>{profile.unlikes.length}</span>
                )}
              </button>
            </Fragment>
          }
          <br></br>
          <br></br>
          {(auth.user ? auth.user.ban === 'false' : false) && (
            <ProfileCommentsForm profileId={profile._id} />
          )}

          {(auth.user ? auth.user.ban === 'true' : false) && (
            <div class='baninfo'>
              Twoje konto zostało zablokowane. Nie możesz oceniać ani
              komentować.
            </div>
          )}

          <div className='comments wrap'>
            {profile.comments.map(comment => (
              <ProfileComments
                key={comment._id}
                comment={comment}
                profileId={profile._id}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLikeP: PropTypes.func.isRequired,
  removeLikeP: PropTypes.func.isRequired,
  banUser: PropTypes.func.isRequired,
  unbanUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  addLikeP,
  removeLikeP,
  getProfileById,
  banUser,
  unbanUser
})(Profile);
