import React, {useEffect, useState} from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import './Explorer.css';
import { useKeycloak } from 'react-keycloak';

export default () => {
    const [ keycloak ] = useKeycloak()
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState({})
    const [attributes, setAttributes] = useState({})
    useEffect(()=> {
        keycloak.loadUserProfile()
        .then(data => {
            setProfile(data)
            setAttributes(data.attributes)
            console.log(data.attributes)
            setLoading(false)
        })
    }, [])

  return (
    <div>
      <h3>My Account</h3>
      <hr />
      {}
      <Row>
          <Col>
          { profile && 
                <div>
                    <p><strong>Name:</strong> {`${profile.firstName} ${profile.lastName} `}</p>
                    <p><strong>E-mail:</strong> {profile.email}</p>
                    <p><strong>Phone Number:</strong> {attributes.phoneNumber}</p>
                </div>
            }
          </Col>
      </Row>
      <Row>
          <Col xs={6}>
              { attributes && 
              <dl>
                  <dt>Last login:</dt>
                  <dd>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(attributes.last_login)}</dd>
                  <dt>Number of logins:</dt>
                  <dd>{attributes.login_count}</dd>
              </dl>
              }
          </Col>
      </Row>
      
      <Button variant="secondary" href={keycloak.createLogoutUrl()} >Logout</Button>
    </div>
  );
};