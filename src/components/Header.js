import React from 'react';
import { Link } from 'react-navi';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
    render() {
        return (
            <header>
                <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="#home">
                      <FontAwesomeIcon icon={faTemperatureHigh} className="ml-2"/>  Monitaur
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link className="nav-link" href="/explorer">
                            Dashboard
                        </Link>
                        <Link className="nav-link" href="/account">
                            Account
                        </Link>
                    </Nav>
                    
                </Navbar>
            </header>
        )
    }
}

export default Header