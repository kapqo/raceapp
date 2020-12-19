import React from 'react'
import PropTypes from 'prop-types'

const ProfileVehicle = ({ 
    vehicle: { brand, model, engine, hp, fuel, year, description } 
}) =>  <div>
      <h3 className="textcustomdark">{brand} {model}</h3>  
      <p>
          <strong>Year: </strong> {year}
      </p>  
      <p>
          <strong>Engine: </strong> {engine}
      </p>
    </div>


ProfileVehicle.propTypes = {
    vehicle: PropTypes.array.isRequired,
}

export default ProfileVehicle
