import { route } from 'navi';
import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

import { withKeycloak } from 'react-keycloak';

const LoginPage = withKeycloak(({ keycloak }) => {
  return (
    <Jumbotron>
        <h1>Welcome Back!</h1>
        <p> Sign-In to get started. </p>
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