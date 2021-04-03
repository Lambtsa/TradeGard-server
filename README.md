# Three Musketeers Trading App Back end Repo
Welome to the Three Musketeers' trading app. This is the application we built as a graduation project for the </SALT> Applied School of Technology. Our strong beliefs in responsible consumption and minimalism led us to create and application that would allow users to swap items by matching users that mutually liked each others items.

This is the backend API that exposes our data for our front end application.

## Who are we ?
- [Mina Hosseini](https://github.com/mina-h)
- [Oscar Lindqvist](https://github.com/qvistdev09)
- [Tom Lamb](https://github.com/Lambtsa)

## Key Features
- Endpoints: 
  - GET /api/items - Get all items
  - GET /api/items/:id - Get item by ID
  - POST /api/items - Post new item
  - PUT /api/items/:id - Update item by ID
  - POST /api/users - Post new user
  - 
- Okta Integration
- Mongo DB connector
- Mongoose ODM (Object Data Modeling)
- MongoDB Atlas database
- Linting with Eslint using a SALT specific config
- Testing using JEST and SUPERTEST

## How to use

In the project directory, you can run:

### `yarn start`

Runs the API in production mode.\

### `yarn dev`

Runs the API in the development mode.\
Send requests to [http://localhost:8080](http://localhost:8080).


### `yarn test`

Launches the test runner.\
See how to get started with [Jest testing](https://jestjs.io/docs/getting-started).


## Credits

This software uses the following packages:
- [NodeJS](https://nodejs.org/dist/latest-v14.x/docs/api/)
- [Express](https://expressjs.com/en/4x/api.html)
- [Eslint Config SALT](https://github.com/saltswap/eslint-config-salt)
- [Mongoose ODM](https://mongoosejs.com/docs/guides.html)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Okta](https://developer.okta.com/docs/guides/)
- [Jest testing](https://jestjs.io/docs/getting-started)

## Related 
[Trading app React front end](https://github.com/Lambtsa/trading-app-client)
