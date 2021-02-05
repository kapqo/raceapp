import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteVehicle } from '../../actions/profile';
import { Icon, Table, Image } from 'semantic-ui-react';

const Vehicle = ({ vehicle, deleteVehicle }) => {
  const vehicles = vehicle.map(veh => (
    <Table.Row key={veh._id}>
      <Table.HeaderCell>
        <Image src={veh.photo} size='tiny' rounded />
      </Table.HeaderCell>
      <Table.HeaderCell>{veh.brand}</Table.HeaderCell>
      <Table.HeaderCell>{veh.model}</Table.HeaderCell>
      <Table.HeaderCell className='hide-sm'>{veh.year}</Table.HeaderCell>
      <Table.HeaderCell className='hide-sm'>{veh.engine}</Table.HeaderCell>
      <Table.HeaderCell className='hide-sm'>{veh.hp}</Table.HeaderCell>
      <Table.HeaderCell className='hide-sm'>{veh.fuel}</Table.HeaderCell>
      <Table.HeaderCell>
        <Link to={`/edit-vehicle/${veh._id}`} class='ui grey button'>
          <Icon name='edit' />
          Edit
        </Link>
        <button
          onClick={() => deleteVehicle(veh._id)}
          className='ui negative button'
        >
          <Icon name='delete' />
          Delete
        </button>
      </Table.HeaderCell>
    </Table.Row>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Vehicle Credentials</h2>
      <Table color='green'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell className='hide-sm'>Year</Table.HeaderCell>
            <Table.HeaderCell className='hide-sm'>Engine</Table.HeaderCell>
            <Table.HeaderCell className='hide-sm'>HP</Table.HeaderCell>
            <Table.HeaderCell className='hide-sm'>Fuel</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{vehicles}</Table.Body>
      </Table>
    </Fragment>
  );
};

Vehicle.propTypes = {
  vehicle: PropTypes.array.isRequired,
  deleteVehicle: PropTypes.func.isRequired
};

export default connect(null, { deleteVehicle })(Vehicle);
