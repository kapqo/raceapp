import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { getProfiles } from '../../actions/profile'

const Profile = ({ getProfiles, profile: {profiles, loading} }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return <Fragment>
        { loading ? <Spinner /> : <Fragment>
            <h1 className="large textcustom">Users</h1>
            <p className="lead">
                <i className="fas fa-flag-checkered"> Browse and connect with users</i>
            </p>
            <div className="profiles">
                { profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h4>No profiles found</h4> }
            </div>
        </Fragment> }
    </Fragment>
}

Profile.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})


export default connect(mapStateToProps, { getProfiles })(Profile)
