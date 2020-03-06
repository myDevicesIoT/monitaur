import { route } from 'navi';
import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

import { withKeycloak } from 'react-keycloak';

const LoginPage = withKeycloak(({ keycloak }) => {
  return (
    <Jumbotron>
        <h1>Temperature & Humidity Monitoring!</h1>
        <p> With Monitaur it's easy and simple to monitor your assets. Sign-in to get started! </p>
        <Button variant="primary" size="lg" onClick={() => keycloak.login()}>
            Login
        </Button>
    </Jumbotron>
  );
});

export default route({
  title: 'Login',
  view: <LoginPage />
});