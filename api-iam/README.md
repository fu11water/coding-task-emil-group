# API-IAM

This is the API-IAM project built with Nest.js. It implements a microservices architecture using gRPC for communication.

## Features

- User authentication and authorization.
- CRUD operations for users, roles, and permissions.
- Secure password handling with bcrypt.
- JWT for secure token generation and validation.
- TypeORM integration for ORM based database interactions.

## Installation

Install dependencies, run migrations, run service:

```bash
cd api-iam
npm install
npm run build
npm run migration:run
npm run start
```

## Configuration

Ensure you have a .env file in the root directory with the necessary environment variables set, such as JWT_SECRET_KEY,SERVICE_ERROR_ID and DB related variables.

## Running the Application

To start the application in development mode, run:

```bash
npm run start:dev
```

For production mode:

```bash
npm run start:prod
```

## Scripts

The package.json file includes the following scripts for development:

build: Compiles the application.
start: Runs the compiled application.
lint: Lints the codebase.
test: Runs unit tests.
test:cov: Runs tests with coverage.
migration:run: Runs migrations.

## Modules

The application is structured into several modules:

Auth Module: Handles authentication logic.
Users Module: Manages user-related operations.
Roles Module: Defines user roles.
Permissions Module: Manages user permissions.

## Protobuf Definitions

The user.proto file in the proto directory defines the gRPC services and messages.
