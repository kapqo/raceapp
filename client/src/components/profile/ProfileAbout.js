import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: { 
        bio,
        interests,
        user: {name}
} }) => 
        <div class="profile-about bg-customlight p-2">
            {bio && (
                <Fragment>
                    <h2 class="textcustomdark">{name.trim().split(' ')[0]}s Bio</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                        doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
                        neque modi perspiciatis similique?
                    </p>
                </Fragment>
            )}
          <div class="line"></div>
          <h2 class="textcustomdark">Interests Set</h2>
          <div class="interests">
              {interests.map((interests, index) => (
                  <div key={index} className='p-1'>
                      <i className="fas fa-check" /> {interests}
                  </div>
              ))}
          </div>
        </div>

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout
