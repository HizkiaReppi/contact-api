# Contact API Spec

## Create Contact API

Endpoint: POST /api/contacts

Headers:
- Authorization: token

***Request Body:***
```json
{
  "first_name": "Hizkia",
  "last_name": "Reppi",
  "email": "hizkia@gmail.com",
  "phone": "082345678910",
}
```

***Response Body Success:***
```json
{
  "status": true,
  "code": 201,
  "message": "Create Data Contact Success",
  "data": {
    "id": "unique-id",
    "first_name": "Hizkia",
    "last_name": "Reppi",
    "email": "hizkia@gmail.com",
    "phone": "082345678910",
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
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint: PUT /api/contacts/:id

Headers:
- Authorization: token

***Request Body:***
```json
{
  "first_name": "Hizkia",
  "last_name": "Reppi",
  "email": "hizkia@gmail.com",
  "phone": "082345678910"
}
```

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Update Data Contact Success",
  "data": {
    "id": "unique-id",
    "first_name": "Hizkia",
    "last_name": "Reppi",
    "email": "hizkia@gmail.com",
    "phone": "082345678910",
    "updated_at": "timestamp"
  },
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 400,
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint: GET /api/contacts

Headers:
- Authorization: token

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Get Data Contact Success",
  "data": {
    "id": "unique-id",
    "first_name": "Hizkia",
    "last_name": "Reppi",
    "email": "hizkia@gmail.com",
    "phone": "082345678910",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  },
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 404,
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint: GET /api/contacts

Headers:
- Authorization: token

Query params:
- name: Search by first_name or last_name, using like, optional
- email: Search by email, using like, optional
- phone: Search by phone, using like, optional
- page: Number of page, default 1
- size: Size per page, default 10

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Search Data Contacts Success",
  "data": [
    {
      "id": "unique-id-1",
      "first_name": "Hizkia",
      "last_name": "Reppi",
      "email": "hizkia@gmail.com",
      "phone": "082345678910",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    },
    {
      "id": "unique-id-2",
      "first_name": "Jefren",
      "last_name": "Reppi",
      "email": "jefren@gmail.com",
      "phone": "082345678910",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    },
  ],
  "meta": {
    "page": 1,
    "total_page": 3,
    "total_data": 30
  }
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

## Remove Contact API

Endpoint: DELETE /api/contacts/:id

Headers:
- Authorization: token

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Remove Data Contact Success",
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 404,
  "errors": "Contact is not found"
}
```
