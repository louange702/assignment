# System Architecture - Louange Project

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │   Frontend       │              │  Admin Dashboard │         │
│  │   (React)        │              │     (React)      │         │
│  │   Port: 5173     │              │   Port: 3001     │         │
│  └────────┬─────────┘              └────────┬─────────┘         │
│           │                                  │                   │
│           │         HTTP/HTTPS               │                   │
│           │         Requests                 │                   │
└───────────┼──────────────────────────────────┼───────────────────┘
            │                                  │
            │                                  │
            └──────────────┬───────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                    ┌──────────────────┐                          │
│                    │   Backend API    │                          │
│                    │   (Express.js)   │                          │
│                    │   Port: 5000     │                          │
│                    └────────┬─────────┘                          │
│                             │                                    │
│         ┌───────────────────┼───────────────────┐               │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────┐      ┌──────────────┐     ┌──────────┐           │
│  │  Routes  │      │ Middleware   │     │Controllers│           │
│  │          │      │              │     │           │           │
│  │ - Admin  │      │ - Auth (JWT) │     │ - Admin   │           │
│  │ - Users  │      │ - CORS       │     │ - Users   │           │
│  │ - Services│     │ - Body Parser│     │ - Services│           │
│  │ - Team   │      │              │     │ - Team    │           │
│  │ - Contacts│     │              │     │ - Contacts│           │
│  └──────────┘      └──────────────┘     └──────────┘           │
│                                                                   │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                                │ SQL Queries
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                    ┌──────────────────┐                          │
│                    │  MySQL Database  │                          │
│                    │  (louange_db)    │                          │
│                    └────────┬─────────┘                          │
│                             │                                    │
│         ┌───────────────────┼───────────────────┐               │
│         │         │         │         │         │               │
│         ▼         ▼         ▼         ▼         ▼               │
│    ┌────────┐ ┌──────┐ ┌─────────┐ ┌──────┐ ┌────────┐         │
│    │ admins │ │users │ │services │ │ team │ │contacts│         │
│    └────────┘ └──────┘ └─────────┘ └──────┘ └────────┘         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow

### 1. Admin Login Flow
```
Admin Dashboard (Login Page)
    │
    │ POST /api/admin/login
    │ { email, password }
    ▼
Backend API (adminRoutes)
    │
    ▼
Admin Controller
    │
    ├─ Query admins table
    ├─ Verify password (bcrypt)
    └─ Generate JWT token
    │
    ▼
Response: { token, admin }
    │
    ▼
Admin Dashboard
    │
    └─ Store token in localStorage
```

### 2. Protected Resource Access Flow
```
Admin Dashboard (Any Page)
    │
    │ GET /api/users
    │ Headers: { Authorization: Bearer <token> }
    ▼
Backend API
    │
    ▼
Auth Middleware
    │
    ├─ Extract token
    ├─ Verify JWT
    └─ Decode user info
    │
    ▼
User Controller
    │
    └─ Query users table
    │
    ▼
Response: [users array]
    │
    ▼
Admin Dashboard
    │
    └─ Display users in table
```

### 3. CRUD Operation Flow
```
Admin Dashboard (Users Page)
    │
    │ Click "Add User"
    ▼
Modal Form Opens
    │
    │ Fill form & submit
    │ POST /api/users
    │ { name, email, password, phone }
    ▼
Backend API
    │
    ▼
Auth Middleware (verify token)
    │
    ▼
User Controller
    │
    ├─ Hash password (bcrypt)
    └─ INSERT INTO users
    │
    ▼
MySQL Database
    │
    └─ Save user record
    │
    ▼
Response: { message, id }
    │
    ▼
Admin Dashboard
    │
    ├─ Close modal
    ├─ Refresh user list
    └─ Show success message
```

---

## Component Interaction

### Backend Components
```
server.js
    │
    ├─ Initialize Express
    ├─ Setup Middleware (CORS, Body Parser)
    ├─ Load Routes
    └─ Start Server
    
Routes
    │
    ├─ Define endpoints
    ├─ Apply middleware
    └─ Call controllers
    
Controllers
    │
    ├─ Business logic
    ├─ Database queries
    └─ Response formatting
    
Middleware
    │
    ├─ Authentication (JWT)
    ├─ Request validation
    └─ Error handling
    
Database Config
    │
    ├─ Connection pool
    └─ Query execution
```

### Admin Dashboard Components
```
App.jsx
    │
    ├─ Router setup
    ├─ Protected routes
    └─ Route definitions
    
Pages
    │
    ├─ Login (public)
    ├─ Dashboard (protected)
    ├─ Users (protected)
    ├─ Services (protected)
    ├─ Team (protected)
    └─ Contacts (protected)
    
Components
    │
    └─ Sidebar (navigation)
    
API Calls (axios)
    │
    ├─ GET requests
    ├─ POST requests
    ├─ PUT requests
    └─ DELETE requests
```

---

## Data Flow Diagram

### User Registration (Frontend → Backend → Database)
```
Frontend Form
    │
    │ User enters data
    ▼
Validation
    │
    │ Check required fields
    ▼
API Call
    │
    │ POST /api/users
    │ { name, email, password, phone }
    ▼
Backend Receives
    │
    ▼
Controller Processing
    │
    ├─ Validate input
    ├─ Hash password
    └─ Prepare query
    │
    ▼
Database Insert
    │
    │ INSERT INTO users (...)
    ▼
Database Response
    │
    │ Return insertId
    ▼
Backend Response
    │
    │ { message: "User created", id: 1 }
    ▼
Frontend Updates
    │
    ├─ Show success message
    ├─ Clear form
    └─ Refresh list
```

---

## Security Layers

```
┌─────────────────────────────────────────┐
│         Security Layer 1                │
│         Frontend Validation             │
│  - Required field checks                │
│  - Email format validation              │
│  - Password strength checks             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Security Layer 2                │
│         JWT Authentication              │
│  - Token verification                   │
│  - Token expiration check               │
│  - Protected route access               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Security Layer 3                │
│         Backend Validation              │
│  - Input sanitization                   │
│  - SQL injection prevention             │
│  - Password hashing (bcrypt)            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Security Layer 4                │
│         Database Security               │
│  - Parameterized queries                │
│  - User permissions                     │
│  - Connection pooling                   │
└─────────────────────────────────────────┘
```

---

## Technology Stack

```
┌─────────────────────────────────────────┐
│           Frontend Layer                │
│  - React 18                             │
│  - React Router DOM                     │
│  - Axios (HTTP client)                  │
│  - Vite (Build tool)                    │
└─────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│          Backend Layer                  │
│  - Node.js                              │
│  - Express.js                           │
│  - JWT (jsonwebtoken)                   │
│  - bcryptjs                             │
│  - CORS                                 │
└─────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│          Database Layer                 │
│  - MySQL 8.0+                           │
│  - mysql2 (Node.js driver)              │
│  - Connection pooling                   │
└─────────────────────────────────────────┘
```

---

## Port Configuration

```
┌──────────────────────────────────────────┐
│  Port 5173  │  Frontend (Vite Dev)       │
├──────────────────────────────────────────┤
│  Port 3001  │  Admin Dashboard (Vite)    │
├──────────────────────────────────────────┤
│  Port 5000  │  Backend API (Express)     │
├──────────────────────────────────────────┤
│  Port 3306  │  MySQL Database            │
└──────────────────────────────────────────┘
```

---

## Database Schema Relationships

```
┌──────────────┐
│   admins     │  (Independent)
│              │
│ - id (PK)    │
│ - username   │
│ - email      │
│ - password   │
└──────────────┘

┌──────────────┐
│    users     │  (Independent)
│              │
│ - id (PK)    │
│ - name       │
│ - email      │
│ - password   │
│ - phone      │
└──────────────┘

┌──────────────┐
│  services    │  (Independent)
│              │
│ - id (PK)    │
│ - title      │
│ - description│
│ - icon       │
└──────────────┘

┌──────────────┐
│team_members  │  (Independent)
│              │
│ - id (PK)    │
│ - name       │
│ - position   │
│ - bio        │
│ - image_url  │
└──────────────┘

┌──────────────┐
│  contacts    │  (Independent)
│              │
│ - id (PK)    │
│ - name       │
│ - email      │
│ - subject    │
│ - message    │
│ - status     │
└──────────────┘

Note: All tables are independent with no foreign key relationships
```

---

## Deployment Architecture (Production)

```
┌─────────────────────────────────────────────────────────┐
│                    Internet                              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 Load Balancer / CDN                      │
│              (Cloudflare / AWS CloudFront)               │
└────────────┬────────────────────────────┬────────────────┘
             │                            │
             ▼                            ▼
┌──────────────────────┐      ┌──────────────────────┐
│   Static Hosting     │      │   API Server         │
│   (Netlify/Vercel)   │      │   (VPS/Heroku/AWS)   │
│                      │      │                      │
│ - Frontend           │      │ - Backend API        │
│ - Admin Dashboard    │      │ - Express.js         │
└──────────────────────┘      └──────────┬───────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │   Database Server    │
                              │   (MySQL/AWS RDS)    │
                              │                      │
                              │ - louange_db         │
                              └──────────────────────┘
```

This architecture provides:
- ✅ Separation of concerns
- ✅ Scalability
- ✅ Security
- ✅ Maintainability
- ✅ Easy deployment
