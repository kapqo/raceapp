import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Container, Image, Icon, Segment, Header } from 'semantic-ui-react'

const GroupItem = ({ group: { _id, name, avatar, status, description } }) => {

    let sIcon = '';
    if(status === 'private') {sIcon = 'key'} else sIcon = 'globe'


    return <Fragment>
                <Card>
                    {/* przetestować czy to działa */}
                    {avatar !== '' ?
                        <Image src={avatar} wrapped ui={false} /> :  <Segment placeholder>
                            <Header icon>
                            <Icon name='image outline' />
                            No images uploaded for this vehicle.
                          </Header>
                        </Segment>
                    }
                    <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta><Icon name='key' circular /></Card.Meta>
                    <Card.Description>{description}</Card.Description>
                    {/* zrobić liczbę użytkowników w grupie */}
                    {/* przycisk otwierający modal z grupą, tło się zaciemnia */}
                    </Card.Content>
                </Card>
        </Fragment>
}

GroupItem.propTypes = {
    group: PropTypes.object.isRequired,
}

export default GroupItem