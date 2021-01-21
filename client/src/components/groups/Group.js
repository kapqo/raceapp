import React, { Fragment, useEffect } from 'react'
import {useSelector} from "react-redux";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import GroupItem from './GroupItem'
import { getGroups } from '../../actions/group'
import { Card, Container, Header, Icon } from 'semantic-ui-react'


const Group = ({ getGroups, group: { groups, loading }  }) => {
    useEffect(() => {
        getGroups();
    }, [getGroups]);


    console.log(groups)

    return <Fragment>
                <Container text>
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
