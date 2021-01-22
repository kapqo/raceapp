import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PostItem from '../posts/PostItem'
import PostForm from '../posts/PostForm'
import { getPosts } from '../../actions/post'

const Group = ({  }) => {

    const [open, setOpen] = React.useState(false)

    return <Fragment>
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show more</Button>}
            >
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
                <Modal.Description>
                <Header>Default Profile Image</Header>
                <p>
                    We've found the following gravatar image associated with your e-mail
                    address.
                </p>
                <p>Is it okay to use this photo?</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                Nope
                </Button>
                <Button
                content="Yep, that's me"
                labelPosition='right'
                icon='checkmark'
                onClick={() => setOpen(false)}
                positive
                />
            </Modal.Actions>
            </Modal>
    </Fragment>
}

Group.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    post: state.post
  })

export default connect(mapStateToProps, {getPosts})(Group)
