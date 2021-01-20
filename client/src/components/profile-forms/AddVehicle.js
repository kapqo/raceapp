import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addVehicle } from '../../actions/profile'
import { storage } from '../../firebase/firebase'
import { Button, Progress } from 'semantic-ui-react'

const AddVehicle = ({ addVehicle, history }) => {
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
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const { brand, model, engine, hp, fuel, year, description, photo } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const handlePhoto = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
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
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                        setFormData({...formData, photo: url })
                    })
            }
        )
    }

    return (
        <Fragment>
            <h1 class="large textcustom">
       Add a Vehicle
      </h1>
      <p class="lead">
      <i class="fas fa-car-side"></i> Add any vehicles that you have had in the past
      </p>
      <form class="form" onSubmit={e => {
          e.preventDefault();
          addVehicle(formData, history);
      }}>
        <div class="form-group">
            <input type="text" placeholder="Brand" name="brand" required value={brand} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Model" name="model" required value={model} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
            <input type="text" placeholder="Engine" name="engine" value={engine} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
            <input type="text" placeholder="Horsepower" name="hp" value={hp} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
            <input type="text" placeholder="Fuel" name="fuel" value={fuel} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
            <input type="text" placeholder="Year" name="year" value={year} onChange={e => onChange(e)}/>
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Vehicle Description"
            value={description} onChange={e => onChange(e)}
          ></textarea>
        </div>
        <div class="form-group">
            <input type="file" accept=".png, .jpg, .jpeg" onChange={handlePhoto}/>
            <button className="btn" onClick={handleUpload}>Upload</button>
            <Progress percent={progress} active autoSuccess></Progress>
        </div>
        <button type="submit" class="btn btncustom my-1">Add a vehicle</button>
        <a class="btn btncustomlight my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

AddVehicle.propTypes = {
    addVehicle: PropTypes.func.isRequired,
}

export default connect(null, { addVehicle })(withRouter(AddVehicle))
