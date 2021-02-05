import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export const DashboardActions = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div class='dash-buttons'>
        <Link to='/edit-profile' class='ui grey button'>
          <Icon name='edit' /> Edit Profile
        </Link>
        <Link to='/add-vehicle' class='ui green button'>
          <Icon name='add circle' /> Add Vehicle
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
