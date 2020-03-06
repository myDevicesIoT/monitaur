import React from 'react';
import { Link } from 'react-navi';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {

    render() {
        return (
            <header>
                <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="/explorer">
                        <FontAwesomeIcon icon={faTemperatureHigh} className="ml-2"/>  Monitaur
                    </Navbar.Brand>
                    <Nav className="mr-auto">

                        <Link className="nav-link" href="/account">
                            <FontAwesomeIcon icon={faUserCircle} />
                        </Link>
                    </Nav>
                    
                </Navbar>
            </header>
        )
    }
}

export default Header