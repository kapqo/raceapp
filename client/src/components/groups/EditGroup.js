import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getGroup, editGroup } from '../../actions/group';
import { storage } from '../../firebase/firebase';
import {
  Button,
  Form,
  Radio,
  Label,
  Icon,
  Header,
  Grid,
  Progress
} from 'semantic-ui-react';

const EditGroup = ({
  group: { group, loading },
  editGroup,
  getGroup,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    description: '',
    user: '',
    status: null,
    admin: ''
  });

  useEffect(() => {
    getGroup(match.params.id);
  }, [getGroup, match.params.id]);

  const setData = () => {
    setFormData({
      name: loading || !group.name ? '' : group.name,
      avatar: loading || !group.avatar ? '' : group.avatar,
      description: loading || !group.description ? '' : group.description,
      user: loading || !group.user ? '' : group.user,
      status: loading || !group.status ? '' : group.status,
      admin: loading || !group.admin ? '' : group.admin
    });
  };

  useEffect(() => {
    if (group !== null) setData();
  }, [group]);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const { name, description, status } = formData;

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

  return group === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header as='h1'>Edit a Group</Header>
      <Form
        onSubmit={e => {
          e.preventDefault();
          editGroup(match.params.id, formData, history);
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
            <Radio
              toggle
              checked={status}
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
            Save
          </Button>
        ) : (
          <Button disabled color='green' type='submit'>
            Save
          </Button>
        )}
        <Link className='ui yellow button' to='/groups'>
          Go Back
        </Link>
      </Form>
    </Fragment>
  );
};

EditGroup.propTypes = {
  editGroup: PropTypes.func.isRequired,
  getGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroup, editGroup })(
  withRouter(EditGroup)
);
