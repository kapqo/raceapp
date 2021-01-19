import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon, Image, Modal, Grid, Header, Label } from 'semantic-ui-react'

const ProfileVehicle = ({ 
    vehicle: { _id ,brand, model, engine, hp, fuel, year, description, photo }, profile: {profile},
}) =>  
    {
        const [open, setOpen] = useState(false)
        return(
    <div className="veh-grid">
    <div>
      <h3 className="textcustomdark">{brand} {model}</h3>  
      <p>
          <strong>Year: </strong> {year}
      </p>  
      <p>
          <strong>Engine: </strong> {engine}
      </p>
      </div>
      <div className="photo-veh">
          <img src={photo} alt=""></img>
      </div>
      <div>
        <p>
            <Fragment>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                trigger={<Button>Show more!</Button>}
              >
                <Modal.Header>Specs and disscusion</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Grid columns='three' divided>
                      <Grid.Row stretched>
                        <Grid.Column>
                          <Image size='medium' src={photo} wrapped />
                        </Grid.Column>
                        <Grid.Column>
                          <Header as='h1'>Brand: {brand}</Header>
                          <Header as='h2'>Model: {model}</Header>
                          <Header as='h3'>Year: {year}</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as='h3'>Engine: {engine}</Header>
                          <Header as='h3'>HP: {hp}</Header>
                          <Header as='h3'>Fuel: {fuel}</Header>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                      <Label><Header as='h2'>Description: </Header>
                      <p>{description}</p></Label>
                      </Grid.Row>
                    </Grid>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button primary onClick={() => setOpen(false)}>
                    Close <Icon name='right chevron' />
                  </Button>
                </Modal.Actions>
              </Modal>
            </Fragment>
        </p>
      </div>
    </div>
        )
    }
    


ProfileVehicle.propTypes = {
    vehicle: PropTypes.array.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {})(ProfileVehicle)
