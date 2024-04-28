# API-Auth

This is the API-Auth project, developed using Nest.js. It provides authentication- and authorization-related services, checking users and it's permissions through a microservices architecture utilizing gRPC for communication.

## Features

- Checking users and it's permissions.
- Secure microservice communication with gRPC.
- Integration with TypeORM for ORM-based database interactions.

## Installation

Install dependencies, run migrations, run service:

```bash
cd api-auth
npm install
npm run build
npm run start
```

## Configuration

Create a .env file in the root directory and set the necessary environment variables:

```bash
DATABASE_HOST
DATABASE_PORT
DATABASE_USERNAME
DATABASE_PASSWORD
DATABASE_NAME
JWT_SECRET_KEY
SERVICE_ERROR_ID
```

## Running the Application

To start the application:

```bash
npm run start:dev # Development mode with hot reload
```

For production mode:

```bash
npm run start:prod
```

## Scripts

The package.json includes various scripts for development:

```bash
build: Compiles the application.
start: Runs the compiled app.
lint: Lints the codebase.
test: Runs unit tests.
test:cov: Runs tests with coverage reporting.
migration:run: Executes database migrations.
```

## Modules

The application includes such module:

Main App Module: Handles validation operations.

## Protobuf Definitions

Protobuf services and messages are defined in auth.proto for gRPC communication.
