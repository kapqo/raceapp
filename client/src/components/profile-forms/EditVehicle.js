import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { getVehicleById, editVehicle } from '../../actions/profile'

const EditVehicle = ({ profile: { profile, loading }, editVehicle, getVehicleById, history, match }) => {
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

    useEffect(() => {
        getVehicleById(match.params.id);

        const veh = profile.vehicle.find(veh => veh._id === match.params.id);

        const vehIndex = profile.vehicle.indexOf(veh);

        setFormData({
            brand: loading || !profile.vehicle[vehIndex] ? '' : profile.vehicle[vehIndex].brand,
            model: loading || !profile.vehicle[vehIndex] ? '' : profile.vehicle[vehIndex].model,
            engine: loading || !profile.vehicle[vehIndex] ? '' : profile.vehicle[vehIndex].engine,
            hp: loading || !profile.vehicle[vehIndex] ? '' : profile.vehicle[vehIndex].hp,
            fuel: loading || !profile.vehicle[vehIndex] ? '' : profile.vehicle[vehIndex].fuel,
            year: loading || !profile.vehicle[vehIndex] ? '' : profile.vehicle[vehIndex].year,
            description: loading || !profile.vehicle[vehIndex] ? '' : profile.vehicle[vehIndex].description,
            photo: loading || !profile.vehicle[vehIndex] ? '' : profile.vehicle[vehIndex].photo,
        })
    }, [loading, getVehicleById, match.params.id])

    const { brand, model, engine, hp, fuel, year, description, photo } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    return (
        <Fragment>
            {profile === null || loading ? ( <Spinner /> ) : ( <Fragment>
                <h1 class="large textcustom">
       Edit a Vehicle
      </h1>
      <p class="lead">
      <i class="fas fa-car-side"></i> Edit your vehicle
      </p>
      <form class="form" onSubmit={e => {
          e.preventDefault();
          editVehicle( match.params.id, formData, history);
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
            <input type="text" disabled="true" placeholder="Photo" name="photo" value={photo} onChange={e => onChange(e)}/>
        </div>
        <input type="submit" class="btn btncustom my-1"/>
        <a class="btn btncustomlight my-1" href="dashboard.html">Go Back</a>
      </form>
            </Fragment> )}
        </Fragment>
    )
}

EditVehicle.propTypes = {
    editVehicle: PropTypes.func.isRequired,
    getVehicleById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getVehicleById, editVehicle })(withRouter(EditVehicle))
