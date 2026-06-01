# Product Inventory Management API

This is a simple, stateless backend API built with Express.js for managing a product inventory. This project was developed as part of the Decodelabs internship certification test to demonstrate architectural integrity, data validation, and semantic code under production pressure.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete products.
- **Database Integration**: Persistent storage using **Supabase** (PostgreSQL).
- **Data Validation**: Robust input validation using `express-validator`.
- **Stateless Architecture**: RESTful design ensuring scalability and simplicity.
- **Centralized Error Handling**: Consistent error responses across all endpoints.
- **Modular Structure**: Clean separation of concerns (Routes, Controllers, Models, Middleware).

## Architecture

The project follows a modular architecture:

- `src/index.js`: Entry point that starts the server and loads environment variables.
- `src/config/supabase.js`: Supabase client configuration.
- `src/app.js`: Express application setup and middleware configuration.
- `src/controllers/productController.js`: Handles incoming requests (async).
- `src/models/productModel.js`: Manages data persistence via Supabase.
- `src/routes/productRoutes.js`: Defines the API endpoints.
- `src/middleware/`:
    - `validationMiddleware.js`: Input validation rules and logic.
    - `errorHandler.js`: Global error handling and custom API error class.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm
- A Supabase project

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Configuration:
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

3. Database Setup:
   Run the SQL commands found in `schema.sql` in your Supabase SQL Editor to create the `products` table and insert sample data.

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

## API Documentation

### Base URL
`http://localhost:3000/api`

### Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/products` | Retrieve all products |
| GET | `/products/:id` | Retrieve a specific product by ID |
| POST | `/products` | Create a new product |
| PUT | `/products/:id` | Update an existing product by ID |
| DELETE | `/products/:id` | Delete a product by ID |
| GET | `/health` | API health check |

### Product Schema

| Field | Type | Description |
| --- | --- | --- |
| id | Integer | Unique identifier (read-only) |
| name | String | Product name (required) |
| description| String | Product description (optional) |
| price | Float | Product price (required, positive) |
| quantity | Integer | Stock quantity (required, non-negative) |
| category | String | Product category (required) |

### Sample Requests

#### Create a Product
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"name":"Smartphone","description":"Latest smartphone","price":699.99,"quantity":25,"category":"Electronics"}' \
http://localhost:3000/api/products
```

#### Update a Product
```bash
curl -X PUT -H "Content-Type: application/json" \
-d '{"name":"Smartphone XL","description":"Updated description","price":799.99,"quantity":20,"category":"Electronics"}' \
http://localhost:3000/api/products/3
```

## Validation & Error Handling

- **400 Bad Request**: Returned when input validation fails (e.g., missing fields, negative price).
- **404 Not Found**: Returned when a requested product ID does not exist.
- **500 Internal Server Error**: Returned for unexpected server errors.

All error responses follow this format:
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Product not found"
}
```
