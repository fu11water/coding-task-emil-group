# API-Insurance

This is the API-Insurance project, developed using Nest.js. It provides insurance-related services, managing contracts and requests through a microservices architecture utilizing gRPC for communication.

## Features

- Management of insurance contracts and requests.
- CRUD operations for contracts and requests.
- Secure microservice communication with gRPC.
- Integration with TypeORM for ORM-based database interactions.

## Installation

Install dependencies, run migrations, run service:

```bash
cd api-iam
npm install
npm run migration:run
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

bash
npm run start:dev # Development mode with hot reload
For production mode:

bash
npm run start:prod

## Scripts

The package.json includes various scripts for development:

build: Compiles the application.
start: Runs the compiled app.
lint: Lints the codebase.
test: Runs unit tests.
test:cov: Runs tests with coverage reporting.
migration:run: Executes database migrations.

## Modules

The application includes several modules:

Requests Module: Handles insurance requests.
Contracts Module: Manages insurance contracts.
App Module: Main application module integrating all others.

## Protobuf Definitions

Protobuf services and messages are defined in insurance.proto for gRPC communication.
