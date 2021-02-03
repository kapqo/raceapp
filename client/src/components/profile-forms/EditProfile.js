import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storage } from '../../firebase/firebase';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Progress } from 'semantic-ui-react';

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
      photo: loading || !profile.vehicle ? '' : profile.vehicle.photo
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
      <h1 className='large textcustom'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            City & district suggested (eg. Cracow, Tyniec)
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Interests'
            name='interests'
            value={interests}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Please use comma after each interests (eg. Honda, Vag, Stance, JDM)
          </small>
        </div>
        <div class='form-group'>
          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            onChange={handlePhoto}
          />
          <button className='btn' onClick={handleUpload}>
            Upload
          </button>
          <Progress percent={progress} active autoSuccess></Progress>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btncustomlight'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
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

        <input type='submit' className='btn btncustom my-1' />
        <Link className='btn btncustomlight my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
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
