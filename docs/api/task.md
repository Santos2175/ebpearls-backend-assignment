# Task Management REST API Documentation

## Base URL

`http://localhost:7000/api`

**Note :** The PORT may vary based on your port definition in your `.env` file. Here in my case, it is 7000.

---

### API Overview

| Method   | End-Point           | Description                                 |
| -------- | ------------------- | ------------------------------------------- |
| `GET`    | `/tasks`            | List all _tasks_                            |
| `GET`    | `/tasks/:id`        | Fetch a specific _task_                     |
| `POST`   | `/tasks/`           | Create a new _task_                         |
| `PUT`    | `/tasks/:id`        | Update a specific _task_                    |
| `PATCH`  | `/tasks/:id/status` | Update only the status of a specific _task_ |
| `DELETE` | `/tasks/:id`        | Delete a specific _task_                    |

---

## GET `/tasks`

Fetch all the tasks.

### Request

- METHOD: `GET`
- URL: `/tasks`

### Path Params

None

### Query Params (Optional)

- `status`: Filter tasks by their status (`pending`, `completed`, `in-progress`)
- `page`: Page number for pagination (default:`1`)
- `limit`: Number of tasks per page (default:`10`)
- `sort`: Orders the task based on date created. `desc` for new date to old and `asc` for old date to new. (default:`desc`)
- Example of use case:
  - `http://localhost:7000/api/tasks?status=pending&page=1&limit=1&sort=asc` (development)
  - `https://tasks-management.up.railway.app/api/tasks?status=pending&page=1&limit=1&sort=asc` (production)

### Success Response (When tasks are available)

- STATUS: `200 OK`

```json
{
    "success": true,
    "message": "Tasks retrieved successfully",
    "data": {
        "tasks": [
            {
                "_id": "67fac58b27e7ab9338bb8526",
                "title": "Exercise",
                "description": "I am going for a jog tomorrow morning.",
                "status": "pending",
                "createdAt": "2025-04-13 01:41:59",
                "updatedAt": "2025-04-13 01:41:59"
            },
            {
                "_id": "67faa25031d2991f856b6b5d",
                "title": "Exercise",
                "description": "I am going for a jog tomorrow morning.",
                "status": "pending",
                "createdAt": "2025-04-12 23:11:40",
                "updatedAt": "2025-04-12 23:11:40"
            },
            {
                "_id": "67f8aaa3e812dbd3db10f615",
                "title": "Read",
                "description": "Prepare for maths test",
                "status": "pending",
                "createdAt": "2025-04-11 11:22:39",
                "updatedAt": "2025-04-11 11:22:39"
            },
            {
                "_id": "67f8023afdd21dc9d6973404",
                "title": "Greet",
                "description": "Need to greet teacher at school",
                "status": "pending",
                "createdAt": "2025-04-10 23:24:06",
                "updatedAt": "2025-04-13 13:41:21"
            }
        ],
        "pagination": {
            "currentPage": 1,
            "totalPages": 1,
            "totalTasks": 4,
            "limit": 10
        }
    }
}

```

### Success Response (When there are no tasks)

- STATUS: `200 OK`

```json
{
  "success": true,
  "message": "No tasks found",
  "data": {
    "tasks": [],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalTasks": 0,
      "limit": 10
    }
  }
}
```

**Note :** A 200 OK response with an empty tasks: [] array means the request was successful, but there are no tasks currently available. This follows standard REST practices.

---

## GET `/tasks/:id`

Fetch the specific task by `id`.

### Request

- METHOD: `GET`
- URL: `/tasks/:id`

### Path Params

- id: id of the task to fetch.

### Success Response

- STATUS: `200 OK`

```json
{
    "success": true,
    "data": {
        "_id": "67f8023afdd21dc9d6973404",
        "title": "Greet",
        "description": "Need to greet teacher at school",
        "status": "pending",
        "createdAt": "2025-04-10 23:24:06",
        "updatedAt": "2025-04-13 13:41:21"
    }
}

```

### Error Response

- STATUS: `404 Not Found`

```json
{
  "success": false,
  "error": "Task with given ID not found"
}
```

- STATUS: `400 Bad Request` (Invalid ID format)

```json
{
  "success": false,
  "error": "Invalid Task ID"
}
```

---

## POST `/tasks`

Create new task.

### Request

- METHOD: `POST`
- URL: `/tasks`

### Path Params

None

### Request Body

```json
{
  "title": "Exercise",
  "description": "I am going for a jog tomorrow morning.",
  "status": "pending"
}
```

### Success Response

- STATUS: `201 created`

```json
{
    "success": true,
    "message": "Task added successfully",
    "data": {
        "title": "Exercise",
        "description": "I am going for a jog tomorrow morning.",
        "status": "pending",
        "_id": "67fb72fe1b315b41b75b25f2",
        "createdAt": "2025-04-13 14:02:02",
        "updatedAt": "2025-04-13 14:02:02"
    }
}

```

### Error Response

- STATUS: `400 Bad Request` (Validation Error)

```json
{
  "success": false,
  "error": ["Title is required", "Description is required"]
}
```

---

## PUT `/tasks/:id`

Update a specific task by id.

### Request

- METHOD: `PUT`
- URL: `/tasks/:id`

### Path Params

- id: the id of the task to be updated.

### Request Body

```json
{
  "title": "Greet",
  "description": "Need to greet teacher at school",
  "status": "pending"
}
```

### Success Response

- STATUS: `200 OK`

```json
{
    "success": true,
    "message": "Task updated successfully",
    "data": {
        "_id": "67f8023afdd21dc9d6973404",
        "title": "Greet",
        "description": "Need to greet teacher at school",
        "status": "pending",
        "createdAt": "2025-04-10 23:24:06",
        "updatedAt": "2025-04-13 14:05:41"
    }
}

```

### Error Response

- STATUS: `404 Not Found`

```json
{
  "success": false,
  "error": "Task with given ID not found"
}
```

- STATUS: `400 Bad Request` (validation error: PUT method requires all data to be updated)

```json
{
  "success": false,
  "error": [
    "Title is required",
    "Description is required",
    "Status is required"
  ]
}
```

---

## PATCH `/tasks/:id/status`

Update the status of specific task by id.

### Request

- METHOD: `PATCH`
- URL: `/tasks/:id/status`

### Path Params

- id: the id of the task whose status is to be updated.

### Request Body

```json
{
  "status": "in-progress"
}
```

### Success Response

- STATUS: `200 OK`

```json
{
    "success": true,
    "message": "Task status updated successfully",
    "data": {
        "_id": "67f8023afdd21dc9d6973404",
        "title": "Greet",
        "description": "Need to greet teacher at school",
        "status": "in-progress",
        "createdAt": "2025-04-10 23:24:06",
        "updatedAt": "2025-04-13 14:06:07"
    }
}

```

### Error Response

- STATUS: `404 Not Found`

```json
{
  "success": false,
  "error": "Task with given ID not found"
}
```

- STATUS: `400 Bad Request` (Validation Error: if the the respective field to be updated is absent in body request)

```json
{
  "success": false,
  "error": ["Status is required"]
}
```

- STATUS: `400 Bad Request` (Validation Error: if the entry for respective field is invalid)

```json
{
  "success": false,
  "error": ["Status must be one of: pending, completed, in-progress"]
}
```

---

## DELETE `/tasks/:id`

Delete a specific task by id.

### Request

- METHOD: `DELETE`
- URL: `/tasks/:id`

### Path Params

- id: the id of the task to be deleted.

### Success Response

- STATUS: `200 OK`

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Error Response

- STATUS: `404 Not Found`

```json
{
  "success": false,
  "error": "Task with given ID not found"
}
```

---

## Invalid URL Routes

Example:

## GET `/tasks/task`

### Error Response

- STATUS: `404 Not Found`

```json
{
  "success": false,
  "error": ["Route /api/tasks/task not found"]
}
```
