import React from 'react'
import Growl from './Growl'
import ReactDOM from 'react-dom';

const defaults = {
    wrapperId: "notifications-wrapper",
    animationDuration: 3000,
    timeout: 1000
}

function Notifications() {
    return (
        <div id={defaults.wrapperId} style={{position: 'relative', zIndex: '1040', display: 'block'}}></div>
    )
}

/* Render React component */
function renderToast(text, type, timeout, color) {
    let target = document.getElementById(defaults.wrapperId);
    ReactDOM.render(<Growl text={text} />, target);
}

/* Unmount React component */
function hide() {
    let target = document.getElementById(defaults.wrapperId);
    ReactDOM.unmountComponentAtNode(target);
}

function show(text) {
    if (!document.getElementById(defaults.wrapperId).hasChildNodes()) {
        // Use default timeout if not set.
        let renderTimeout = defaults.timeout;

        // Render Component with Props.
        renderToast(text);

        if (renderTimeout === -1) {
            return false;
        }

        // Unmount react component after the animation finished.
        setTimeout(function() {
            hide();
        }, renderTimeout + defaults.animationDuration);

        return true;
    }

    return false;
}

export let notify = {
    show,
}

export default Notifications