import React from 'react';
import './App.css';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import { AppRouter } from './routes';

// Setup Keycloak instance as needed
const keycloak = new Keycloak({ 
  url: process.env.REACT_APP_IDP_URL, 
  realm: process.env.REACT_APP_IDP_REALM, 
  clientId: process.env.REACT_APP_IDP_CLIENT_ID
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.tokens = JSON.parse(localStorage.getItem('kcTokens') || '{}');
  }

  onKeycloakTokens = tokens => {
    console.log('[KC] setting token on local storage')
    localStorage.setItem('kcTokens', JSON.stringify(tokens));
  }

  onKeycloakEvent = e => {
    //console.log(e);
  }

  render() {

    return (
      <KeycloakProvider
        keycloak={keycloak}
        initConfig={{
          onLoad: 'login-required',
          promiseType: 'native',
          ...this.tokens,
          
        }}
        onEvent={this.onKeycloakEvent}
        onTokens={this.onKeycloakTokens}
      >
        <AppRouter />
      </KeycloakProvider>
    );
  }
}

export default App;
