# User API Spec

## Register User API

Endpoint: POST /api/users/register

***Request Body:***
```json
{
  "username": "admin",
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "admin123",
}
```

***Response Body Success:***
```json
{
  "status": true,
  "code": 201,
  "message": "Register Success",
  "data": {
    "username": "admin",
    "name": "Admin",
    "email": "admin@gmail.com",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  },
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 400,
  "errors": "Username already registered"
}
```

## Login User API

Endpoint: POST /api/users/login

***Request Body:***
```json
{
  "username": "admin",
  "password": "admin123",
}
```

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Login Success",
  "data": {
    "token": "unique-token"
  },
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 400,
  "errors": "Username or password wrong"
}
```

## Update User API

Endpoint: PATCH /api/users/current

Headers:
- Authorization: token

***Request Body:***
```json
{
  "name": "admin", // Optional
  "email": "admin@gmail.com", // Optional
  "password": "new password" // Optional
}
```

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Update Data User Success",
  "data": {
    "username": "admin",
    "name": "Admin",
    "email": "admin@gmail.com",
    "updated_at": "timestamp"
  },
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 400,
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint: GET /api/users/current

Headers:
- Authorization: token

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Get Data User Success",
  "data": {
    "username": "admin",
    "name": "Admin",
    "email": "admin@gmail.com",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  },
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 401,
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint: DELETE /api/users/logout

Headers:
- Authorization: token

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Logout Success",
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 401,
  "errors": "Unauthorized"
}
```
