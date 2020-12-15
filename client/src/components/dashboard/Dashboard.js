import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { deleteAccount, getCurrentProfile } from '../../actions/profile'
import Vehicle from './Vehicle'
import DashboardActions from './DashboardActions'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: {profile, loading}, deleteAccount }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large textcustom">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name }
        </p>
        {profile !== null ? (
        <Fragment>
            <DashboardActions />
            <Vehicle vehicle={profile.vehicle}/>

            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i> Delete my account
                </button>
            </div>
        </Fragment>
        ) : (
        <Fragment>
            <p>You have not setup a profile, please add some info</p>
            <Link to='/create-profile' className="btn btncustom my-1">
                Create Profile
            </Link>
        </Fragment>
        )}
    </Fragment>;
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
