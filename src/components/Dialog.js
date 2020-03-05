import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button } from 'react-bootstrap'

const Dialog = ({isShowing, hide, title, body}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <Modal show={true} animation={false} onHide={hide}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ body }</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={e => hide()}>
                No
                </Button>
                <Button variant="danger" onClick={e => hide(true) }>
                Yes
                </Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>, document.body
) : null;

export default Dialog;