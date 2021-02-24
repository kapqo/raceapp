import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { addGroup } from '../../actions/group';
import { storage } from '../../firebase/firebase';
import {
  Button,
  Progress,
  Form,
  Checkbox,
  Grid,
  Label,
  Icon
} from 'semantic-ui-react';

const AddGroup = ({
  addGroup,
  history,
  getCurrentProfile,
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    description: '',
    user: '',
    status: false,
    admin: '',
    adminname: '',
    adminavatar: ''
  });

  const [image, setImage] = useState(null);
  const [setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const { name, avatar, description, status } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoto = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = e => {
    e.preventDefault();
    const uploadTask = storage.ref(`groupAvatars/${image.name}`).put(image);
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
          .ref('groupAvatars')
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
      <Form
        onSubmit={e => {
          e.preventDefault();
          addGroup(formData, history);
        }}
      >
        <Form.Field>
          <label>Group's name</label>
          <input
            type='text'
            placeholder="Group's name"
            name='name'
            required
            value={name}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Desciption</label>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder="Group's description, rules, etc."
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </Form.Field>
        <Form.Field>
          <Label>
            <Checkbox
              toggle
              value={status}
              name='status'
              onChange={e => {
                setFormData({ ...formData, status: !status });
              }}
            />
            <Icon circular name='key' color='blue'></Icon>Private
          </Label>
        </Form.Field>
        <Form.Field>
          <label>
            Group's avatar<small>(optional)</small>
          </label>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <input
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  onChange={handlePhoto}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Button type='submit' onClick={handleUpload}>
                  Upload
                </Button>
              </Grid.Column>
              <Grid.Column stretched>
                <Progress percent={progress} active autoSuccess></Progress>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>
        {progress === 0 || progress === 100 ? (
          <Button color='green' type='submit'>
            Create a group
          </Button>
        ) : (
          <Button disabled color='green' type='submit'>
            Create a group
          </Button>
        )}
        <Link className='ui yellow button' to='/groups'>
          Go Back
        </Link>
      </Form>
    </Fragment>
  );
};

AddGroup.propTypes = {
  addGroup: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  addGroup,
  getCurrentProfile
})(withRouter(AddGroup));
