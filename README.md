[![Build Status](https://travis-ci.org/oleesir/wayfarer-api.svg?branch=develop)](https://travis-ci.org/oleesir/wayfarer-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/1a045a31f842d8f92b00/maintainability)](https://codeclimate.com/github/oleesir/wayfarer-api/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/1a045a31f842d8f92b00/test_coverage)](https://codeclimate.com/github/oleesir/wayfarer-api/test_coverage) [![codecov](https://codecov.io/gh/oleesir/wayfarer-api/branch/develop/graph/badge.svg)](https://codecov.io/gh/oleesir/wayfarer-api)
# wayfarer-api

# banka
A banking application that helps users perform banking transactions.


# Table of Contents

1. <a href="#hosted-app">Hosted App</a>
2. <a href="#pivotal-tracker-board">Pivotal Tracker Board</a>
3. <a href="#api-documentation">API Documentation</a>
4. <a href="#built-with">Built With</a>
5. <a href="#supporting-packages">Supporting packages</a>
6. <a href="#application-features">Application Features</a>
7. <a href="#getting-started">Getting Started</a>
8. <a href="#running-tests">Running Tests</a>
9.  <a href="#api-endpoints">API endpoints</a>
10. <a href="#license">License</a>
11. <a href="#author">Author</a>

## Hosted App

coming soon

## Pivotal Tracker Board

https://www.pivotaltracker.com/n/projects/2359645

## API Documentation

coming soon

## Built With

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Html]()
* [CSS]()
* [Postgres](https://www.postgresql.org/)

## Supporting packages
#### Linter
* [ESLint](https://eslint.org/)

#### Compiler
* [Babel](https://babeljs.io/)
  
#### Test Tools
* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Supertest](https://www.npmjs.com/package/supertest) - Super-agent driven
  library for testing node.js HTTP servers

## Application Features
* User Registration
* User can book a trip
* User can view all trips
* Admin can create a trip
* Admin can cancel a trip
* Admin can view all trips and bookings
* Admin can get a list of filtered trips based on origin and destination.


## Getting Started
### Installation
* Install [NodeJS](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) on your computer
* Clone this repository using `git@github.com:oleesir/wayfarer-api.git`
* Use the `.env.example` file to setup your environmental variables and rename the file to `.env`
* Run `npm install` to install all dependencies
* Run `npm run build` to build the project
* Run `npm start` to start the server
* Navigate to [localhost:3000](http://localhost:3000/) in browser to access the application



## Running Tests

Dependencies to enable them work are included in the `package.json` file. To run unit tests, you can do the following:

```bash
# Enter the project's directory
$ cd banka/

# To run the available unit tests
$ npm run test
```

**Install nyc globally to generate and view coverage reports via the command line**

```bash
npm install --save-dev nyc
```

**Using Postman**

If you have Postman installed, you can test routes listed below. An example response spec would be:
```bash
# on successful request to the sign in route /api/v1/auth/signin
{
  "status": "success",
  "data": {
       "user_id": Integer,
        "first_name": String,
        "last_name": String,
        "email": String,
        ​“user_id”​:​Integer,​ 
 ​       “is_admin”:Boolean​,
      "token": "jbhfuhbfhrb_r.iufnr3uinrufrf"
    } 
}
```

```bash
# on errored request to the sign in route /api/v1/auth/signin
{
  "status": 404,
  "error": "User not found"
}
```


## API endpoints

| Method   |                    Endpoint                     |                Description                 |        Access         |
| :------- | :---------------------------------------------: | :----------------------------------------: | :-------------------: |
| `POST`   |              `/api/v1/auth/signup`              |       Register a new user on the app       |        User        |
| `POST`   |              `/api/v1/auth/signin`              |           Login an existing user           | User & Admin |
| `POST`   |               `/api/v1/trips`                |             Create a trip              |        Admin        |
| `PATCH`  |       `/api/v1/trips/id`       |         Edit a trip status           |      Admin      |
| `DELETE` |       `/api/v1/bookings/id`        |             Delete a booking             |      User      |
| `POST`   |  `/api/v1/bookings`  |              Get all bookings              |      User & Admin      |
| `POST`   | `/api/v1/trips?origin=:origin or /api/v1/trips?destination=:destination`  |        get a list of filtered trips based on origin and destination             |      User & Admin     |
| `GET`    |       `api/v1/trips/id`        |      View aspecific trip details      | User & Admin |
| `GET`    |                `api/v1/trips`                |      View a list of all trips      |     User & Admin      |
| `POST`    |                `api/v1/buses`                |      Create a bus      |      Admin      |


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author

 **Olisa Emodi**
