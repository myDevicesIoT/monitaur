import React from 'react';
import { useKeycloak } from 'react-keycloak';
import Header from '../components/Header'
import { Container, Row } from 'react-bootstrap';

export default function Layout({ children }) {
  const { keycloak } = useKeycloak();
 
  return (
    <div>
      <Header authenticated={keycloak.authenticated}></Header>
      <Container fluid={true}>
        <Row>
          <main role="main" className="col-md-12 ml-sm-auto col-lg-12 pt-3 px-4 bg-gray">
            {children}
          </main>
        </Row>
      </Container>
    </div>
  );
};