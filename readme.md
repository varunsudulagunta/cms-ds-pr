# Cash Management System

This project is a Cash Management System for Port Cost Management Services and Disbursement Accounting, built with Node.js, Express, and MongoDB. It features a modular structure with various components for managing payments, balances, client accounts whilst integration with Ebury platform.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/cash-management-system.git
    ```

2. Navigate to the project directory:

    ```bash
    cd cash-management-system
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Rename `.env.example` to `.env` and update the values accordingly.

## Project Structure

```plaintext
cash-management-system/
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── environment.js
│   │
│   ├── models/
│   │   ├── payment.js
│   │
│   ├── controllers/
│   │   ├── paymentController.js
│   │
│   ├── services/
│   │   ├── eburyService.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── eburyRoutes.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── validateRequest.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   └── asyncHandler.js
│   │
│   └── app.js
│
├── tests/
│   ├── unit/
│   │   └── controllers/
│   │       ├── eburyController.test.js
│   │       └── paymentController.test.js
│   │
│   └── utils/
│         └── testHelpers.js
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── Dockerfile
└── docker-compose.yml
````

## Usage
1. Start the dev server:
    ```bash
    npm start
    ```

2.Access the application at http://localhost:3000

## API Endpoints

1. Authentication
    POST /auth/login - Login a user
2. Payments
    POST /payments - Create a new payment
3. Balances
    POST /balances - Get all balances
4. Client Accounts
    POST /client-accounts - Get all client accounts
5. Beneficiaries
    POST /beneficiaries - Get all beneficiaries
6. Ebury Specific
    POST /ebury/get-code - Get authorization code
    POST /ebury/get-token - Get access token
    POST /ebury/get-estimate-quote - Get estimate quote
    POST /ebury/get-firm-quote - Get firm quote

## Running Tests
```bash
npm test
```
1.Unit Tests
Unit tests are located in the tests/unit directory.

2.Integration Tests
Integration tests are located in the tests/integration directory.

## Environment Variables
The following environment variables are used in the project:

PORT - The port on which the server runs
MONGO_URI - The MongoDB connection string
JWT_SECRET - The secret key for signing JWT tokens
EBURY_CLIENT_ID - Ebury client ID
EBURY_CLIENT_SECRET - Ebury client secret
EBURY_CODE_URL - Ebury code URL
EBURY_TOKEN_URL - Ebury token URL

## Docker Setup
Dockerfile
The Dockerfile for the project is as follows:

``` plaintext
# Use the official Node.js 18 image as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production --omit=dev

# Copy the rest of your app's source code
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Add a healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

# Run the application as a non-root user
USER node

# Start the app
CMD ["node", "src/app.js"]

```

Docker Compose
The docker-compose.yml file is as follows:

``` plaintext
version: '3.8'

services:
  app:
    build: 
      context: .
      dockerfile: Dockerfile
    image: cms-ds-pr-app
    container_name: nodejs-app
    restart: always
    env_file: .env
    environment:
      - NODE_ENV=production
      - MONGO_URI=${MONGODB_URI}
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    networks:
      - app-network

  mongo:
    image: mongo:5
    container_name: mongo
    restart: unless-stopped
    ports:
      - "3001:27017"
    env_file: .env
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  mongo-data:
    driver: local
```

## License
This project is licensed under the MIT License.
