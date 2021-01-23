import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import GroupItem from './GroupItem'
import { getGroups } from '../../actions/group'
import { Card, Container, Header, Icon, Label, Grid, Button } from 'semantic-ui-react'


const Group = ({ getGroups, group: { groups, loading }  }) => {
    useEffect(() => {
        getGroups();
    }, [getGroups]);

    return <Fragment>
                { loading ? <Spinner /> : <Fragment>
                <Container text>
                    <Grid columns='equal'>
                        <Grid.Column width={4}>
                            <Link to="/add-group"><Button>Click Here</Button></Link>
                        </Grid.Column>
                        <Grid.Column stretched>
                            <Label pointing='left' size='large'>
                                Didn't find a group that suits you? Just create a new group by clicking here!
                            </Label>
                        </Grid.Column>
                    </Grid>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='group' circular />
                        <Header.Content>Groups</Header.Content>
                    </Header>
                    <Card.Group centered itemsPerRow={4}>
                        {loading ? <Spinner /> : <Fragment>
                            { groups.length > 0 ? (
                            groups.map(group => (
                                <GroupItem key={group._id} group={group} />
                            ))
                        ) : <h4>No groups found</h4> }
                        </Fragment>}
                    </Card.Group>
                </Container>
                </Fragment>}
            </Fragment>

}

Group.propTypes = {
    getGroups: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
        group: state.group
    })


export default connect(mapStateToProps, { getGroups })(Group)
