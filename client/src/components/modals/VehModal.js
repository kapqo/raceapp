import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Image, Modal } from 'semantic-ui-react'

const VehModal = ({ vehicle: { _id ,brand, model, engine, hp, fuel, year, description, photo }}) => {
  const [open, setOpen] = useState(false)

    const pokacojesgrane = () => {
        console.log({_id})
    }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={(vehicle) => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Hello</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={photo} wrapped />
        <Modal.Description>
          <p>Would you like to upload this image?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={pokacojesgrane}>eluwina</Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => setOpen(false)} positive>Ok</Button>
      </Modal.Actions>
    </Modal>
  )
}

VehModal.propTypes = {
    vehicle: PropTypes.array.isRequired,
}

export default VehModal