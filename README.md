
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
