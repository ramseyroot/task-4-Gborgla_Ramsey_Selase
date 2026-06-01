# Product Inventory Management System

This is a full-stack web application built for managing a product inventory. It consists of a robust stateless backend API built with Express.js and a modern, responsive frontend built with React, TypeScript, and Vite.

## Features

### Backend (API)
- **Full CRUD Operations**: Create, Read, Update, and Delete products.
- **Database Integration**: Persistent storage using **Supabase** (PostgreSQL).
- **Data Validation**: Robust input validation using `express-validator`.
- **Stateless Architecture**: RESTful design ensuring scalability and simplicity.
- **Centralized Error Handling**: Consistent error responses across all endpoints.
- **Health Monitoring**: Built-in `/health` endpoint for uptime monitoring.

### Frontend (UI)
- **Modern React**: Built with React 19 and TypeScript.
- **Responsive Dashboard**: Quick overview of inventory stats (Total items, Low stock, Total value).
- **Product Management**: Intuitive interface for browsing, searching, adding, and editing products.
- **Resilient Data Fetching**: Powered by React Suspense with advanced error handling. The UI remains functional even when the backend is offline.
- **Mobile-First Design**: Fully responsive layout optimized for all screen sizes.
- **Interactive Skeletons**: Smooth loading states for a polished user experience.

## Architecture

The project is divided into two main components:

### Backend (`/src`)
- `src/index.js`: Entry point that starts the server.
- `src/app.js`: Express application setup and middleware.
- `src/controllers/`: Business logic for handling requests.
- `src/models/`: Database interactions via Supabase.
- `src/routes/`: API endpoint definitions.
- `src/middleware/`: Validation and global error handling.

### Frontend (`/frontend`)
- `frontend/src/services/api.ts`: API client with Suspense wrappers and error fallbacks.
- `frontend/src/pages/`: Main application views (Dashboard, ProductList, ProductForm).
- `frontend/src/components/`: Reusable UI components (Layout, ProductCard, Skeleton, ErrorBoundary).

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm
- A Supabase project

### Backend Setup
1. From the project root, install dependencies:
   ```bash
   npm install
   ```
2. Environment Configuration:
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
3. Database Setup:
   Run the SQL commands found in `schema.sql` in your Supabase SQL Editor to create the `products` table.
4. Start the backend:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

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

## Resiliency & Error Handling

The application is designed with "failure-first" principles:
- **Graceful Degradation**: If the API is unreachable, the frontend displays clear error messages and allows users to continue navigating other pages.
- **Error Boundaries**: A global error boundary catches unexpected rendering issues to prevent a total app crash.
- **Input Validation**: Double-layered validation (Client-side form checks + Backend API validation) ensures data integrity.

---
*Developed as part of the Decodelabs internship certification test.*
