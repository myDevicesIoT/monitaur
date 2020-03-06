FROM node:12.10.0-alpine

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /src/app/node_modules/.bin:$PATH

# Bundle app source
COPY package.json /src/app/
COPY . /src/app

# Install  app dependencies
RUN npm install

# Build and optimize react app
RUN npm run build

EXPOSE 3000

# defined in package.json
CMD [ "node", "app.js" ]