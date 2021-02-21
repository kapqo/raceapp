import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addVehicle } from '../../actions/profile';
import { storage } from '../../firebase/firebase';
import { Button, Progress, Form, Icon, Header, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { addNotification } from '../../actions/notification';
import { getGroups } from '../../actions/group';
import { addMember } from '../../actions/group';

const AddVehicle = ({
  addVehicle,
  history,
  addNotification,
  getGroups,
  addMember,
  auth,
  group: { groups, loading }
}) => {
  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    engine: '',
    hp: '',
    fuel: '',
    year: '',
    description: '',
    photo: ''
  });

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const { brand, model, engine, hp, fuel, year, description, photo } = formData;

  let groupBrand = groups.find(group => group.name === brand);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoto = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = e => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            setFormData({ ...formData, photo: url });
          });
      }
    );
  };

  return (
    <Fragment>
      <Header as='h1' icon textAlign='center'>
        <Icon name='add' circular />
        <Header.Content>Add a Vehicle!</Header.Content>
      </Header>
      <Header as='h3' textAlign='center'>
        Add any vehicles that you have had in the past
      </Header>
      <Form
        class='form'
        onSubmit={e => {
          e.preventDefault();
          addVehicle(formData, history);
          addNotification({
            text: `added a vehicle to his/her profile, check`,
            link: `http://localhost:3000/profile/${auth.user._id}`
          });
          addMember(groupBrand._id);
        }}
      >
        <Form.Field required>
          <label>Brand</label>
          <input
            type='text'
            placeholder='Brand'
            name='brand'
            required
            value={brand}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Form.Field required>
          <label>Model</label>
          <input
            type='text'
            placeholder='Model'
            name='model'
            required
            value={model}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Engine</label>
          <input
            type='text'
            placeholder='Engine'
            name='engine'
            value={engine}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Horsepower</label>
          <input
            type='text'
            placeholder='Horsepower'
            name='hp'
            value={hp}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Fuel</label>
          <input
            type='text'
            placeholder='Fuel'
            name='fuel'
            value={fuel}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Year</label>
          <input
            type='text'
            placeholder='Year'
            name='year'
            value={year}
            onChange={e => onChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Vehicle Description'
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </Form.Field>
        <Form.Field>
          <label>Vehicle photo</label>

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
        {progress === 100 || progress === 0 ? (
          <button type='submit' class='ui green button'>
            Add a vehicle
          </button>
        ) : (
          <button disabled type='submit' class='ui green button'>
            Add a vehicle
          </button>
        )}
        <Link to='dashboard.html'>
          <Button color='yellow'>Go Back</Button>
        </Link>
      </Form>
    </Fragment>
  );
};

AddVehicle.propTypes = {
  addVehicle: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  addMember: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, {
  addVehicle,
  addNotification,
  getGroups,
  addMember
})(withRouter(AddVehicle));
