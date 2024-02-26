# michelle-lo-dev-space-server

Michelle-Lo-Dev-Space-Server
Description
This is the server component for the Michelle Lo Dev Space application. It provides the backend functionality required for user authentication, data storage, and other server-side operations.

Installation
Clone the repository to your local machine.
Navigate to the project directory.

Install dependencies using npm:

bash
npm install

Usage
To start the server, run the following command:

bash

npm start
The server will start running on the specified port, and you can now make requests to it using the provided endpoints.

Scripts
npm start: Starts the server using nodemon for automatic reloading during development.
npm test: Runs tests for the server (currently no tests specified).
npm run migrate: Runs database migrations to ensure the database schema is up to date.
npm run migrate:down: Rolls back the last database migration.
npm run migrate:rollback: Rolls back all database migrations.
npm run seed: Seeds the database with initial data.
Dependencies
bcrypt: Password hashing library.
bcryptjs: An alternative password hashing library.
dotenv: Loads environment variables from a .env file.
express: Web framework for Node.js.
jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT).
knex: SQL query builder for Node.js.
multer: Middleware for handling multipart/form-data, primarily used for file uploads.
mysql2: MySQL client for Node.js.

Development Dependencies
@faker-js/faker: Library for generating fake data for testing purposes.
