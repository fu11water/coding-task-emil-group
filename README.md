# coding-task-emil-group

This project provide a test project for test coding task

## Technologies

- Nest.js as backend node.js framework
- TypeORM as ORM
- Postgres as database
- Typescript as a main language
- gRPC for communicating between microservices

## Features and Approaches

- Microservices
- Swagger as a client for REST requests
- Was created custom guards and decorators
- Was created custom error handling mechanism
- Added migrations mechanism (both for migrations and fixtures)

## Installation

- clone repository
- create separate user in your database (postgres) and create separate database
- check config for microservices (.env files in folders of each microservice) to have a proper config for database and other keys
- launch in terminal bootstrap.sh from the root of repo with command "sh ./bootstrap.sh". All services and migrations will be started automatically.

## Usage

- in browser go to page 'http://localhost:3003/api' and explore the endpoints.
- every enpoint protects with auth and access guards. So first of all you have to use `login` endpoint and get `accessToken` for one of user. After that you can use accessToken to Authorize in swagger via specific button in the right top corner.
- you can use any of mocked users (logins: `super-admin`, `admin`, `manager`, `blocked`). Every of default mocked user has password: `pass123`.
- to kill all process that was made for project you can see the pid (process ids) of nest js services in console logs and kill them in activity monitor or with terminal via "kill" command.

## Services

You can find additional documantation about every microservice in their folders in README files

## TODOS

Some parts were not implemented because of lack of time. There is a description of them:

- Refactoring. Move all strings to constantns, make unified config files, add responses description for swagger, add more types across the services, remove unnecessary code
- Tests. There are only tests in api-iam service, could be nice to write the tests for other services as well
- Containerization. Make it work inside Docker environment
- Extend permissions decorator and functionality to set up several permissions for every endpoint
- Add posibility for users to refresh theri tokens with 'refresh-token' functionality
- Add posibility for users to have multiple roles
- Add more validations
- Improve system of error handling and logging the errors
- Investigate for unusual cases
- Add mechanism of logging actions across the system

## Possible issues

The algorithm of hash of passwords possibly could work in a different way on different environments. In case if password: `pass123` doesn't work with mocked users you can do the following:

- in api-gateway remove permissions decorator and also remove accessGuard and authGuard for `addUser` endpoint and create your own user with new password. After that you can use that user credentials to login (using login endpoint)
