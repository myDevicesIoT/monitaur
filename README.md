# Monitaur

This project is a custom app that uses the IoT in a Box API and bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

## Requirements
- NodeJS
- NPM or Yarn

## Setup & Installation
This project uses ReactJS framework and Express to host the client application. 

```
cp .env.example .env
```

Edit the `.env` to your specific Client ID and Realm/Tenant.

```
npm install
```

### Development
For development, use `react-scripts` to start the app and in parallel start the express app to proxy API requests. If you need a different `PORT` for the API see the `proxy` attribute under the `package.json` file. 

```
react-scripts start 
PORT=8080 node app.js 
```

## Production Build

```
react-scripts build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Docker
This app contains a `Dockerfile` and can be used to build a docker image and run

```
docker run -d -p 3001:3000 --name monitaur \
-e NODE_ENV=production \
-e REACT_APP_IDP_URL=https://auth.mydevices.com/auth \
-e REACT_APP_IDP_CLIENT_ID=monitaur-app \
-e REACT_APP_IDP_REALM=iotinabox \
monitaur
```