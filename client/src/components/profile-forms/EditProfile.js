import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storage } from '../../firebase/firebase';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Progress } from 'semantic-ui-react';
import { Button, Icon, Header, Form, Grid, Input } from 'semantic-ui-react';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    interests: '',
    avatar: '',
    instagram: '',
    facebook: '',
    youtube: '',
    brand: '',
    model: '',
    engine: '',
    hp: '',
    fuel: '',
    year: '',
    description: '',
    photo: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      location: loading || !profile.location ? '' : profile.location,
      bio: loading || !profile.bio ? '' : profile.bio,
      interests:
        loading || !profile.interests ? '' : profile.interests.join(','),
      instagram: loading || !profile.social ? '' : profile.social.instagram,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      brand: loading || !profile.vehicle ? '' : profile.vehicle.brand,
      model: loading || !profile.vehicle ? '' : profile.vehicle.model,
      engine: loading || !profile.vehicle ? '' : profile.vehicle.engine,
      hp: loading || !profile.vehicle ? '' : profile.vehicle.hp,
      fuel: loading || !profile.vehicle ? '' : profile.vehicle.fuel,
      year: loading || !profile.vehicle ? '' : profile.vehicle.year,
      description:
        loading || !profile.vehicle ? '' : profile.vehicle.description,
      photo: loading || !profile.vehicle ? '' : profile.vehicle.photo,
      avatar: loading || !profile.user.avatar ? '' : profile.user.avatar
    });
  }, [loading, getCurrentProfile]);

  const {
    location,
    bio,
    interests,
    avatar,
    instagram,
    facebook,
    youtube,
    brand,
    model,
    engine,
    hp,
    fuel,
    year,
    description,
    photo
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  const handlePhoto = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = e => {
    e.preventDefault();
    const uploadTask = storage.ref(`profileavatars/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('profileavatars')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            setFormData({ ...formData, avatar: url });
          });
      }
    );
  };

  return (
    <Fragment>
      <Header as='h1' icon textAlign='center'>
        <Icon name='edit outline' circular />
        <Header.Content>Edit your profile!</Header.Content>
      </Header>
      <Header as='h3' textAlign='center'>
        Let's get some information to make your profile stand out
      </Header>
      <Form className='form' onSubmit={e => onSubmit(e)}>
        <Form.Field required>
          <label>Location</label>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            required
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            City & district suggested (eg. Cracow, Tyniec)
          </small>
        </Form.Field>
        <Form.Field>
          <label>Bio</label>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </Form.Field>
        <Form.Field required>
          <label>Interests</label>
          <input
            type='text'
            placeholder='Interests'
            name='interests'
            required
            value={interests}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Please use comma after each interests (eg. Honda, Vag, Stance, JDM)
          </small>
        </Form.Field>
        <Form.Field>
          <label>Profile's avatar</label>

          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <input
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  onChange={handlePhoto}
                />
                <small className='form-text'>Optional</small>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button type='submit' onClick={handleUpload}>
                  Upload
                </Button>
              </Grid.Column>
              <Grid.Column stretched>
                <Progress
                  percent={progress}
                  active
                  autoSuccess
                  size='large'
                ></Progress>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>

        <div className='my-2'>
          <Button
            color='facebook'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </Button>
          <small className='form-text'>Optional</small>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        {progress === 0 || progress === 100 ? (
          <input type='submit' className='ui green button ' value='Save' />
        ) : (
          <input
            type='submit'
            className='ui green button disabled'
            value='Save'
          />
        )}

        <Link className='ui yellow button' to='/dashboard'>
          Go Back
        </Link>
      </Form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
