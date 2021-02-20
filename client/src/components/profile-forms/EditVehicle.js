import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { storage } from '../../firebase/firebase';
import { getVehicleById, editVehicle } from '../../actions/profile';
import {
  Button,
  Icon,
  Header,
  Form,
  Input,
  Grid,
  Progress
} from 'semantic-ui-react';

const EditVehicle = ({
  profile: { profile, loading },
  editVehicle,
  getVehicleById,
  history,
  match
}) => {
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

  useEffect(() => {
    getVehicleById(match.params.id);

    const veh = profile.vehicle.find(veh => veh._id === match.params.id);

    const vehIndex = profile.vehicle.indexOf(veh);

    setFormData({
      brand:
        loading || !profile.vehicle[vehIndex]
          ? ''
          : profile.vehicle[vehIndex].brand,
      model:
        loading || !profile.vehicle[vehIndex]
          ? ''
          : profile.vehicle[vehIndex].model,
      engine:
        loading || !profile.vehicle[vehIndex]
          ? ''
          : profile.vehicle[vehIndex].engine,
      hp:
        loading || !profile.vehicle[vehIndex]
          ? ''
          : profile.vehicle[vehIndex].hp,
      fuel:
        loading || !profile.vehicle[vehIndex]
          ? ''
          : profile.vehicle[vehIndex].fuel,
      year:
        loading || !profile.vehicle[vehIndex]
          ? ''
          : profile.vehicle[vehIndex].year,
      description:
        loading || !profile.vehicle[vehIndex]
          ? ''
          : profile.vehicle[vehIndex].description,
      photo:
        loading || !profile.vehicle[vehIndex]
          ? ''
          : profile.vehicle[vehIndex].photo
    });
  }, [loading, getVehicleById, match.params.id]);

  const { brand, model, engine, hp, fuel, year, description, photo } = formData;

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
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Header as='h1' icon textAlign='center'>
            <Icon name='edit' circular />
            <Header.Content>Edit your vehicle!</Header.Content>
          </Header>
          <Form
            class='form'
            onSubmit={e => {
              e.preventDefault();
              editVehicle(match.params.id, formData, history);
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
              <Button type='submit' color='green'>
                Save
              </Button>
            ) : (
              <Button type='submit' disabled color='green'>
                Save
              </Button>
            )}

            <a class='ui yellow button' href='dashboard.html'>
              Go Back
            </a>
          </Form>
        </Fragment>
      )}
    </Fragment>
  );
};

EditVehicle.propTypes = {
  editVehicle: PropTypes.func.isRequired,
  getVehicleById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getVehicleById, editVehicle })(
  withRouter(EditVehicle)
);
