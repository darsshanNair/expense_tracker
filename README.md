# Expense Tracker API

## Project Description

The Expense Tracker API is a sample project designed to demonstrate a well-structured, scalable, and maintainable architecture for ExpressJS applications. This project provides a solid foundation for building small-to-medium scale projects, with a focus on adhering to SOLID principles and best practices in ExpressJS. The application simulates basic functionalities of a banking domain, including user registration, login, and expense management.

## Architectural Pattern and Code Structure

### Architecture

This project follows a layered architecture pattern, which includes the following layers:

- **Controller Layer**: Handles incoming HTTP requests and returns HTTP responses. It coordinates with the service layer to fulfill the requests.
- **Service Layer**: Contains the business logic of the application. It processes the input from the controllers, applies business rules, and calls the repository layer.
- **Repository Layer**: Responsible for database interactions. It provides an abstraction over the database operations.
- **Provider Layer**: Handles external API calls and interactions with other services. Currently, it's a placeholder for future extensions.
- **Middleware Layer**: Manages request validation, authentication, and other cross-cutting concerns.

### Tools and Libraries

- **TypeScript**: Provides static typing, which helps in catching errors early and improving code quality.
- **ExpressJS**: A minimal and flexible Node.js web application framework that provides a robust set of features to build web and mobile applications.
- **InversifyJS**: A powerful and lightweight inversion of control (IoC) container for JavaScript & Node.js apps powered by TypeScript.
- **express-validator**: A library for validating and sanitizing user inputs.
- **jsonwebtoken**: Used for generating and verifying JSON Web Tokens (JWT) for authentication.
- **bcrypt**: A library to help hash passwords.


# Project Structure

```
src/
├── config/
│   └── inversify.config.ts       # InversifyJS configuration and bindings
├── controllers/
│   ├── user.controller.ts        # User-related endpoints
│   └── expense.controller.ts     # Expense-related endpoints
├── interfaces/
│   ├── user-repository.interface.ts # User repository interface
│   ├── user-service.interface.ts    # User service interface
│   ├── expense-repository.interface.ts # Expense repository interface
│   ├── expense-service.interface.ts    # Expense service interface
├── middlewares/
│   └── auth.middleware.ts        # Authentication middleware
├── models/
│   ├── user.ts                   # User model
│   └── expense.ts                # Expense model
├── repositories/
│   ├── user.repository.ts        # User repository implementation
│   └── expense.repository.ts     # Expense repository implementation
├── services/
│   ├── user.service.ts           # User service implementation
│   └── expense.service.ts        # Expense service implementation
├── types/
│   └── types.ts                  # Dependency injection types
├── app.ts                        # Express app setup
└── server.ts                     # Server setup and entry point
```



## Running the Project

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/expense-tracker-api.git
    cd expense-tracker-api
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Configure environment variables**:

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=expense_tracker
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.

## Unit Testing Setup

### Testing Tools

- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **Supertest**: A library for testing HTTP servers. It allows you to make HTTP requests and assert the responses.

### Running Tests

1. **Install testing dependencies**:

    ```bash
    npm install --save-dev jest ts-jest @types/jest supertest @types/supertest
    ```

2. **Configure Jest**:

    Ensure your `jest.config.js` file is set up as follows:

    ```javascript
    module.exports = {
      preset: 'ts-jest',
      testEnvironment: 'node',
      testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    };
    ```

3. **Run tests**:

    ```bash
    npm test
    ```

    This will run all the tests in the `__tests__` directories.

## Additional Information

- **Error Handling**: The project includes basic error handling. Each controller method uses try-catch blocks to handle exceptions and return appropriate HTTP responses.
- **Authentication**: JWT-based authentication is implemented to secure API endpoints. The middleware layer handles token validation.
- **Validation**: Input validation is performed using `express-validator` to ensure data integrity and security.

This project provides a robust starting point for developing scalable and maintainable ExpressJS applications. Feel free to extend and modify the structure as needed to fit your specific requirements.
