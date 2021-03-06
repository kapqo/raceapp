import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storage } from '../../firebase/firebase';
import { createProfile } from '../../actions/profile';
import { Button, Icon, Header, Form, Grid, Progress } from 'semantic-ui-react';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    interests: '',
    avatar: '',
    instagram: '',
    facebook: '',
    youtube: ''
  });

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    location,
    bio,
    interests,
    avatar,
    instagram,
    facebook,
    youtube
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
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
        <Icon name='address card outline' circular />
        <Header.Content>Create your profile!</Header.Content>
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

        <input type='submit' className='ui green button' value='Upload' />
        <Link className='ui yellow button' to='/dashboard'>
          Go Back
        </Link>
      </Form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
