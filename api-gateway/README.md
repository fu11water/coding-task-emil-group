# API Gateway

This project serves as an API gateway for managing various microservices.

## Features

- Provide an access to the api of other microservices: api-iam, api-insurance.
- Communicate with user via swagger with REST.
- Communicate with other microservices via gRPC.

## Installation

Install dependencies, run migrations, run service:

```bash
cd api-gateway
npm install
npm run build
npm run start
```

## Usage

Development
To run the project in development mode with hot-reloading, use the following command:

```bash
npm run start:dev
```

Production
To run the project in production mode, use the following command:

```bash
npm run start:prod
```

## Available Scripts

```bash
npm run build: Build the project.
npm run format: Format the source code using Prettier.
npm run lint: Lint the source code using ESLint.
npm test: Run unit tests using Jest.
npm run test:watch: Run unit tests in watch mode.
npm run test:cov: Run unit tests with coverage.
npm run test:debug: Run unit tests in debug mode.
```

## Configuration

The project's configuration is defined in the package.json file, including dependencies, devDependencies

## Microservices

The API gateway communicates with the following microservices:

IAM Service: Manages user authentication and authorization.
Communication via gRPC.
Proto file: ./proto/user/user.proto.

---

Insurance Service: Handles insurance-related functionalities.
Communication via gRPC.
Proto file: ./proto/insurance/insurance.proto.

---

Auth Service: Provides authentication and authorization checks.
Communication via gRPC.
Proto file: ./proto/auth/auth.proto.

## Swagger Documentation

API documentation is generated using Swagger. Access the Swagger UI at http://localhost:3003/api.
