# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
  - [2. Endpoints](#2-endpoints)
    - [1.1 Base URL](#11-base-url)
    - [1.2 Authentication](#12-authentication)
      - [1.2.1 Sign Up](#121-sign-up)
      - [1.2.2 Sign In](#122-sign-in)
    - [1.3 Regions](#13-regions)
      - [1.3.1 Create a Region](#131-create-a-region)
      - [1.3.2 Get All Regions](#132-get-all-regions)
      - [1.3.3 Get Region by ID](#133-get-region-by-id)
    - [1.4 States](#14-states)
      - [1.4.1 Create a State](#141-create-a-state)
      - [1.4.2 Get All States](#142-get-all-states)
      - [1.4.3 Get States by Region](#143-get-states-by-region)
    - [1.5 Local Governments](#15-local-governments)
      - [1.5.1 Create a Local Government](#151-create-a-local-government)
      - [1.5.2 Get All Local Governments](#152-get-all-local-governments)
      - [1.5.3 Get Local Governments by State](#153-get-local-governments-by-state)
    - [1.6 Search](#16-search)
    - [1.7 Error Responses](#17-error-responses)
  - [3. Installation and Setup](#3-installation-and-setup)
    - [3.1 Clone the Repository](#31-clone-the-repository)
    - [3.2 Set Up Environment Variables](#32-set-up-environment-variables)
    - [3.3 Install Dependencies](#33-install-dependencies)
    - [3.4 Run the Application](#34-run-the-application)

## 1. Introduction

The API documentation provides details about the endpoints, request/response formats, and authentication requirements for the application. The API allows users to manage regions, states, local governments, perform user authentication, and search for data.

## 2. Endpoints

### 1.1 Base URL

The base URL for all API endpoints is:

```
https://api.example.com/api
```

### 1.2 Authentication

The API uses token-based authentication. To authenticate requests, include the following headers:

- `Authorization: Bearer <access_token>` - Include this header in all authenticated requests. Replace `<access_token>` with the access token obtained from the authentication process.

#### 1.2.1 Sign Up

**Endpoint:** `POST /auth/signup`

Creates a new user account and return an API Key.

Request Body:

```json
{
  "name": "username",
  "email": "user@example.com",
  "password": "password123"
}
```

Response Body:

```json
{
    "message": "Signup successful",
    "apiKey": "apiKey"
}
```

#### 1.2.2 Sign In

**Endpoint:** `POST /auth/login`

Authenticates a user and returns an access token.

Request Body:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "apiKey": "apiKey"
}
```

Response Body:

```json
{
    "message": "Login successful",
    "token": "YOUR_TOKEN"
}
```

### 1.3 Regions

#### 1.3.1 Create a Region

**Endpoint:** `POST /regions`

Creates a new region. Only the API owner is authorized to access this route.

Request Headers:

- `Authorization: apiKey`

Request Body:

```json
{
  "name": "Region Name",
  "metadata": "Additional metadata for the region"
}
```

Response Body:

```json
{
    "region": {
        "name": "Region Name",
        "states": [],
        "metadata": "Additional metadata for the region",
        "_id": "646e8a6ea94da4f5fcea1cf8",
        "__v": 0
    }
}
```

#### 1.3.2 Get All Regions

**Endpoint:** `GET /regions`

Retrieves all regions with associated data.

Request Headers:

- `Authorization: Bearer <token>`

Response Body:

```json
{
  "regions": [
           {
            "_id": "646f8cb9d161b269fc364d3d",
            "name": "Region Name",
            "states": [state 1, state 2, ...],
            "metadata": "Region metadata",
            "__v": 0
        },
           {
            "_id": "646f8cb9d161b269fc364d3d",
            "name": "Region Name",
            "states": [state 1, state 2, ...],
            "metadata": "Region metadata",
            "__v": 0
        },
    ...
  ]
}
```

#### 1.3.3 Get Region by ID

**Endpoint:** `GET /regions/{regionId}`

Retrieves a specific region by its ID.

Response Body:

```json
{
  "region": {
    "_id": "Region ID",
    "name": "Region Name",
    "states": ["State Name 1", "State Name 2"],
    "metadata": "Additional metadata for the region"
  }
}
```

### 1.4 States

#### 1.4.1 Create a State

**Endpoint:** `POST /states`

Creates a new state.

Request Headers:

- `Authorization: apiKey`

Request Body:

```json
{
  "name": "State Name",
  "regionId": "Region ID",
  "metadata": "Additional metadata for the state"
}
```

Response Body:

```json
{
  "state": {
    "_id": "State ID",
    "name": "State Name",
    "regionId": "Region ID",
    "metadata": "Additional metadata for the state"
  }
}
```

#### 1.4.2 Get All States

**Endpoint:** `GET /states`

Retrieves all states with associated data.

Request Headers:

- `Authorization: Bearer <token>`

Response Body:

```json
{
  "states": [
    {
      "_id": "State ID",
      "name": "State Name",
      "region": "Region Name",
      "metadata": "Additional metadata for the state",
      "LGAs": [LGA1, LGA2, ...]
    },
    ...
  ]
}
```

#### 1.4.3 Get States by Region

**Endpoint:** `GET /regions/regionId/states`

Retrieves all states within a specific region.

Request Headers:

- `Authorization: Bearer <token>`

Response Body:

```json
{
  "states": [
    {
      "_id": "State ID",
      "name": "State Name",
      "region": "Region ID",
      "metadata": "Additional metadata for the state"
    },
    ...
  ]
}
```

### 1.5 Local Governments

#### 1.5.1 Create a Local Government

**Endpoint:** `POST /lgas`

Creates a new local government.

Request Headers:

- `Authorization: apiKey`

Request Body:

```json
{
  "name": "Local Government Name",
  "stateId": "State ID",
  "metadata": "Additional metadata for the local government"
}
```

Response Body:

```json
{
  "lga": {
    "_id": "Local Government ID",
    "name": "Local Government Name",
    "stateId": "State ID",
    "metadata": "Additional metadata for the local government"
  }
}
```

#### 1.5.2 Get All Local Governments

**Endpoint:** `GET /lgas`

Retrieves all local governments with associated data.

Request Headers:

- `Authorization: Bearer <token>`

Response Body:

```json
{
  "localGovernments": [
    {
      "_id": "Local Government ID",
      "name": "Local Government Name",
      "state": "State name",
      "metadata": "Additional metadata for the local government"
    },
    ...
  ]
}
```

#### 1.5.3 Get Local Governments by State

**Endpoint:** `GET /states/stateID/lgas`

Retrieves all local governments within a specific state.

Request Headers:

- `Authorization: Bearer <token>`

Response Body:

```json
{
  "localGovernments": [
    {
      "_id": "Local Government ID",
      "name": "Local Government Name",
      "state": "State name",
      "metadata": "Additional metadata for the local government"
    },
    ...
  ]
}
```

### 1.6 Search

**Endpoint:** `GET /regions/search?query={searchQuery}`

Searches for data based on the provided query.

Request Headers:

- `Authorization: Bearer <token>`

Request Parameters:

- `query`: The search query

`if searchQuery == state name`

Response Body:

```json
{
 "regions": [],
    "states": [
        {
            "_id": "state ID",
            "name": "State name",
            "region": "State Region",
            "metadata": "Additional metadata of the state",
            "__v": 0,
            "LGAs": []
        }
    ],
    "lgas": []
}
```

### 1.7 Error Responses

The API returns appropriate error responses in case of failures. The response will include an error code and message.

Example Error Response:

```json
{
  "error": {
    "code": 400,
    "message": "Invalid request parameters"
  }
}
```

## 3. Installation and Setup

To run the API locally, follow these steps:

### 3.1 Clone the Repository

```bash
git clone git@github.com:CodeMarshal007/locale.git
cd locale
```

### 3.2 Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```
PORT=3000
DB_URL=<your-database-url>
API_KEY_SECRET=<your-api-key-secret>
JWT_SECRET=<your-jwt-secret>
```

Replace `<your-database-url>`, `<your-api-key-secret>`, and `<your-jwt-secret>` with your own values.

### 3.3 Install Dependencies

```bash
npm install
```

### 3.4 Run the Application

```bash
npm start
```

The API will start running on `http://localhost:3000`.

That covers the basics of the RESTful API for managing regions, states, and local governments. You can further extend the functionality based on your specific requirements.

PS: nodemon is not loading mongodb url from env variable, RUN WITH "NPM START". I will fix this shortly.


            Coded with ❤️ By CodeMarshal
