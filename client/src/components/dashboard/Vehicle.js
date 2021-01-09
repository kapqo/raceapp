import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteVehicle } from '../../actions/profile'

const Vehicle = ({ vehicle, deleteVehicle }) => {
    const vehicles = vehicle.map(veh => (
        <tr key={veh._id}>
            <td>{veh.brand}</td>
            <td>{veh.model}</td>
            <td className="hide-sm">{veh.year}</td>
            <td className="hide-sm">{veh.engine}</td>
            <td className="hide-sm">{veh.hp}</td>
            <td className="hide-sm">{veh.fuel}</td>
            <td>
                <Link to={`/edit-vehicle/${veh._id}`} class="btn btncustom">Edit</Link>
                <button onClick={() => deleteVehicle(veh._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Vehicle Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th className="hide-sm">Year</th>
                        <th className="hide-sm">Engine</th>
                        <th className="hide-sm">HP</th>
                        <th className="hide-sm">Fuel</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{vehicles}</tbody>
            </table>
        </Fragment>
    )
}

Vehicle.propTypes = {
    vehicle: PropTypes.array.isRequired,
    deleteVehicle: PropTypes.func.isRequired,
}

export default connect (null, { deleteVehicle })(Vehicle)
