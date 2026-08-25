# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (409)**:
```json
{
  "error": "User already exists"
}
```

---

### Login User

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (401)**:
```json
{
  "error": "Invalid credentials"
}
```

---

## Transaction Endpoints

### Get All Transactions

**Endpoint**: `GET /transactions`

**Query Parameters**:
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string
- `category` (optional): Category name

**Example**:
```
GET /transactions?startDate=2024-01-01T00:00:00Z&endDate=2024-01-31T23:59:59Z&category=Food
```

**Response (200)**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "type": "expense",
    "category": "Food",
    "amount": 25.50,
    "description": "Lunch at restaurant",
    "date": "2024-01-15T12:30:00Z",
    "createdAt": "2024-01-15T12:30:00Z"
  }
]
```

---

### Create Transaction

**Endpoint**: `POST /transactions`

**Request Body**:
```json
{
  "type": "expense",
  "category": "Food",
  "amount": 25.50,
  "description": "Lunch at restaurant",
  "date": "2024-01-15T12:30:00Z"
}
```

**Response (201)**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439010",
  "type": "expense",
  "category": "Food",
  "amount": 25.50,
  "description": "Lunch at restaurant",
  "date": "2024-01-15T12:30:00Z",
  "createdAt": "2024-01-15T12:30:00Z"
}
```

---

### Update Transaction

**Endpoint**: `PUT /transactions/:id`

**Request Body**:
```json
{
  "type": "expense",
  "category": "Food",
  "amount": 30.00,
  "description": "Updated lunch",
  "date": "2024-01-15T12:30:00Z"
}
```

**Response (200)**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439010",
  "type": "expense",
  "category": "Food",
  "amount": 30.00,
  "description": "Updated lunch",
  "date": "2024-01-15T12:30:00Z",
  "createdAt": "2024-01-15T12:30:00Z"
}
```

**Error (404)**:
```json
{
  "error": "Transaction not found"
}
```

---

### Delete Transaction

**Endpoint**: `DELETE /transactions/:id`

**Response (200)**:
```json
{
  "message": "Transaction deleted"
}
```

**Error (404)**:
```json
{
  "error": "Transaction not found"
}
```

---

## Budget Endpoints

### Get Budgets for Month

**Endpoint**: `GET /budgets`

**Query Parameters** (Required):
- `month`: Month number (1-12)
- `year`: Year (e.g., 2024)

**Example**:
```
GET /budgets?month=1&year=2024
```

**Response (200)**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "category": "Food",
    "limit": 500.00,
    "month": "1",
    "year": 2024,
    "spent": 325.50,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T00:00:00Z"
  }
]
```

---

### Create/Update Budget

**Endpoint**: `POST /budgets`

**Request Body**:
```json
{
  "category": "Food",
  "limit": 500.00,
  "month": 1,
  "year": 2024
}
```

**Response (201)**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439010",
  "category": "Food",
  "limit": 500.00,
  "month": "1",
  "year": 2024,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

### Delete Budget

**Endpoint**: `DELETE /budgets/:id`

**Response (200)**:
```json
{
  "message": "Budget deleted"
}
```

**Error (404)**:
```json
{
  "error": "Budget not found"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "All fields are required"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!"
}
```

---

## Categories

Valid categories for transactions and budgets:
- `Food`
- `Books`
- `Travel`
- `Utilities`
- `Entertainment`
- `Other`

---

## Transaction Types

Valid types:
- `income`
- `expense`

---

## Example Usage (cURL)

### Register and Login

```bash
# Register
REGISTER_RESPONSE=$(curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123"
  }')

TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
```

### Add Transaction

```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "type": "expense",
    "category": "Food",
    "amount": 25.50,
    "description": "Lunch",
    "date": "2024-01-15T12:30:00Z"
  }'
```

### Set Budget

```bash
curl -X POST http://localhost:5000/api/budgets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "category": "Food",
    "limit": 500.00,
    "month": 1,
    "year": 2024
  }'
```

### Get Transactions

```bash
curl -X GET 'http://localhost:5000/api/transactions?startDate=2024-01-01T00:00:00Z&endDate=2024-01-31T23:59:59Z' \
  -H "Authorization: Bearer $TOKEN"
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding this for production.

## Security Notes

- All passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Use HTTPS in production
- Keep JWT_SECRET safe and secure
- Validate all inputs on the server side

---

For more information, visit the [GitHub Repository](https://github.com/itzabirami30/finance-budget-tracker)
