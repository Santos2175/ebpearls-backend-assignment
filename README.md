# Task Management API 

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Overview](#api-overview)
- [API Documentation](#api-documentation)
- [Postman Collection](#postman-collection)
- [License](#license)

---

## Introduction
This is a simple Task Management REST API built as part of an assignment provided by the EB Pearls team. It allows users to create, update, delete, and manage tasks efficiently using clean RESTful architecture.

🔗 **Live API**: [https://tasks-management.up.railway.app/api/tasks/](https://tasks-management.up.railway.app/api/tasks/)
You can look at the use of this api with query params and what it returns in responses inside `docs/api/task.md`

---
## Features
- **CRUD Operations** for tasks
  - Create, Retrieve, Update, and Delete tasks.
- **Data Validation** using Joi
- **MongoDB Schema** for tasks with title, description, status, and createdAt.
- **Pagination** for retrieving tasks with `limit` and `page` query parameters.
- **Sorting** tasks by createdAt, status, etc.
- **Filtering** tasks based on status and other criteria.
- **Bonus**: **PATCH** endpoint for updating task status.
- **Error Handling**: Graceful handling of errors with appropriate status codes and messages.

---
## Tech Stack
- **Programming Language**: Typescript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Others**: dotenv, Joi, etc.

---

## Requirements
- [node & npm](http://nodejs.org)
- [MongoDB](https://www.mongodb.com/): Make sure you have your own local or remote MongoDB database connection.
- [PostMan](https://www.getpostman.com/)

---

## Getting Started
### Installation
1. Clone the repository
   ```bash
     git clone https://github.com/Santos2175/ebpearls-backend-assignment.git
   ```
2. Go inside the directory or cloned repo
   ```bash
   cd ebpearls-backend-assignment
   ```
3. Install the packages
   ```bash
   npm install
   ```
   
### Environment variables
Create a `.env` file at the root of the project and add the following environment variables
  ```bash
  PORT=7000 or your-desired-port-number
  MONGO_URI=your-mongo-uri
  NODE_ENV=development or production 
  ```

### Running the Server
1. **Build the project** using the TypeScript compiler. This will generate the `dist/` folder containing the compiled JavaScript files:
   ```bash
   npm run build
   ```

2. **Start the server** using the compiled files.
   ```bash
    npm start
   ```

or, if you want to run it in development mode without compiling to `dist/` folder.
   ```bash
   npm run dev
   ```

---

### API Overview

**Base URL :** `http://localhost:7000/api` (for development)

**Note :** The PORT may vary based on your port definition in your `.env` file. Here in my case, it is 7000.

| Method | End-Point | Description |
| --- | --- | --- |
| `GET` | `/tasks` | List all *tasks* |
| `GET` | `/tasks/:id` | Fetch a specific *task* |
| `POST` | `/tasks/` | Create a new *task* |
| `PUT` | `/tasks/:id` | Update a specific *task* |
| `PATCH` | `/tasks/:id/status` | Update only the status of a specific *task* |
| `DELETE` | `/tasks/:id` | Delete a specific *task* |

---

### API Documentation

For a detailed API documentation with request/response examples, status codes, and error handling, see [docs/api/task.md](./docs/api/task.md).

---

### Postman Collection 
You can import the Postman collection for the Task Management API to test the endpoints directly. The collection includes all the requests along with example responses.

1. Download the collection from the following link: [Postman Collection](./tasks.postman_collection.json)
2. Import it into your Postman app and start testing the API.

---
### License

This project is licensed under the [MIT License](LICENSE).

Feel free to use, modify, and distribute this code for personal or commercial purposes. See the `LICENSE` file for more details.
