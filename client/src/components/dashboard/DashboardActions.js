import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardActions = () => {
    return (
        <div>
            <div class="dash-buttons">
                <Link to="/edit-profile" class="btn btncustonlight">
                <i class="fas fa-user-circle text-primary"></i> Edit Profile</Link>
                <Link to="/add-vehicle" class="btn btncustomlight">
                <i class="fab fa-black-tie text-primary"></i> Add Vehicle</Link>
            </div>
        </div>
    )
}

export default DashboardActions