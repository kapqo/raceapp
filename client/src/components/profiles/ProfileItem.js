import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({ profile: {
    user: { _id, name, avatar },
    location,
    interests
} }) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>{name}</h2>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btncustom">View Profile</Link>
            </div>
            <ul>
                {interests.slice(0, 4).map((interest, index) => (
                    <li key={index} className="textcustom">
                        <i className="fas fa-check"></i> {interest}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
