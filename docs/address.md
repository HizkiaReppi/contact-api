# Address API Spec

## Create Address API

Endpoint: POST /api/contacts/:contactId/addresses

Headers:
- Authorization: token

***Request Body:***
```json
{
  "street": "Jalan",
  "city": "Kota",
  "province": "Provinsi",
  "country": "Negara",
  "postal_code": "Kode Pos"
}
```

***Response Body Success:***
```json
{
  "status": true,
  "code": 201,
  "message": "Create Data Address Success",
  "data": {
    "id": "unique-id",
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "Kode Pos",
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
  "errors": "Country is required"
}
```


## Update Address API

Endpoint: PUT /api/contacts/:contactId/addresses/:addressId

Headers:
- Authorization: token

***Request Body:***
```json
{
  "street": "Jalan",
  "city": "Kota",
  "province": "Provinsi",
  "country": "Negara",
  "postal_code": "Kode Pos"
}
```

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Update Data Address Success",
  "data": {
    "id": "unique-id",
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "Kode Pos",
    "updated_at": "timestamp"
  },
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 400,
  "errors": "Country is required"
}
```


## Get Address API

Endpoint: GET /api/contacts/:contactId/addresses/addressId

Headers:
- Authorization: token

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Get Data Address Success",
  "data": {
    "id": "unique-id",
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "Kode Pos",
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


## List Addresses API

Endpoint: GET /api/contacts/:contactId/addresses

Headers:
- Authorization: token

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Get List Data Addresses Success",
  "data": [
    {
      "id": "unique-id-1",
      "street": "Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postal_code": "Kode Pos",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    },
    {
      "id": "unique-id-2",
      "street": "Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postal_code": "Kode Pos",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    },
  ]
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


## Remove Address API

Endpoint: DELETE /api/contacts/:contactId/addresses/:addressId

***Response Body Success:***
```json
{
  "status": true,
  "code": 200,
  "message": "Remove Data Address Success",
}
```

***Response Body Error:***
```json
{
  "status": false,
  "code": 404,
  "errors": "Address is not found"
}
```
