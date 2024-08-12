# Online Book Review Application

## Overview

This project involves building a server-side online book review application integrated with a secure REST API server. The application utilizes session-level authentication using JSON Web Tokens (JWT) and leverages modern JavaScript features like Promises and Async-Await for handling asynchronous operations.

## Project Features

1. **User Registration & Authentication**
   - Users can register with a username and password.
   - Registered users can log in to the application.
   - Session-level authentication is implemented using JWT.

2. **Book Management**
   - Users can browse a list of books available in the shop.
   - Users can view book details by ISBN, title, or author.
   - Authenticated users can add or modify book reviews.

3. **Secure API**
   - The application exposes a RESTful API for interacting with book data and user reviews.
   - API endpoints are secured, requiring authentication for operations like posting reviews.

4. **Asynchronous Operations**
   - The application demonstrates the use of Promises and Async-Await to handle asynchronous operations.
   - Axios is used for making HTTP requests to fetch book details from external APIs.

## Endpoints

### Public Endpoints

- **Get all books**: `GET /books`
- **Get book by ISBN**: `GET /isbn/:isbn`
- **Get book by title**: `GET /title/:title`
- **Get book by author**: `GET /author/:author`

### Authenticated Endpoints

- **User Registration**: `POST /customer/register`
- **User Login**: `POST /customer/login`
- **Add/Modify Book Review**: `PUT /auth/review/:isbn`

## Technology Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **JWT**: JSON Web Tokens for session-level authentication
- **Axios**: Promise-based HTTP client
- **Promises & Async-Await**: For handling asynchronous operations

## Project Structure

```bash
.
├── router
│   ├── auth_users.js       # Routes for authenticated users
│   ├── booksdb.js          # Book database (JSON)
│   └── general.js          # General routes (publicly accessible)
├── index.js                # Main server file
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
└── ...
