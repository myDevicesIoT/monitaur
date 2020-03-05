import React, { useState } from 'react'
import { Alert, Toast } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'


const style = {
    wrapper: {
        position: 'relative',
        display: 'block',
        'z-index': 1040
    },
    toast: {
        position: 'absolute',
        top: 60,
        right: 10
    }
};

function Growl({text, variant = "success", title=""}) {
    return (
        <Toast show={true} style={style.toast}>
            <Toast.Header closeButton={false}>
                <FontAwesomeIcon icon={faLightbulb} />
                <strong className="mr-auto"> Activity</strong>
            </Toast.Header>
            <Toast.Body>
                <Alert variant={variant}>
                    <p>{text}</p>
                </Alert>
            </Toast.Body>
        </Toast>
    )
}

export default Growl