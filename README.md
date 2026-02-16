# 🎯 Louange Project - Complete Backend & Admin Dashboard

[![Status](https://img.shields.io/badge/Status-Complete-success)]() [![Version](https://img.shields.io/badge/Version-1.0.0-blue)]() [![License](https://img.shields.io/badge/License-Private-red)]()

## 📋 Overview

A complete full-stack application with separated backend API and admin dashboard. Built with Node.js, Express, MySQL, and React.

### 🎯 What's Included
- ✅ **Backend API** - 21 REST endpoints with JWT authentication
- ✅ **Admin Dashboard** - Full CRUD operations for all resources
- ✅ **MySQL Database** - 5 tables with proper schema
- ✅ **Complete Documentation** - 12 comprehensive guides
- ✅ **Automation Scripts** - One-click installation and startup

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL (v8.0+)
- npm

### Installation (3 Steps)

**1. Install Dependencies**
```bash
install.bat
```

**2. Configure Database**
Edit `backend/.env`:
```env
DB_USER=root
DB_PASSWORD=your_password
```

**3. Initialize & Start**
```bash
cd backend
node config/initDb.js
cd ..
start-all.bat
```

### Access
- **Backend API:** http://localhost:5000
- **Admin Dashboard:** http://localhost:3001
- **Frontend:** http://localhost:5173

### Default Login
- **Email:** lounge@gmail.com
- **Password:** 12345

## 📁 Project Structure
```
louange/
├── backend/              # Backend API (Port 5000)
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication
│   └── server.js        # Main server
│
├── admin-dashboard/      # Admin Dashboard (Port 3001)
│   ├── src/
│   │   ├── pages/       # Dashboard pages
│   │   └── components/  # Reusable components
│   └── package.json
│
├── frontend/            # Main Frontend (Port 5173)
│
└── Documentation/       # 12 comprehensive guides
```

## Setup Instructions

### 1. Database Setup
Make sure you have MySQL installed and running.

### 2. Backend Setup
```bash
cd backend
npm install
node config/initDb.js    # Initialize database and create tables
npm start                # Start backend server on port 5000
```

### 3. Admin Dashboard Setup
```bash
cd admin-dashboard
npm install
npm run dev              # Start admin dashboard on port 3001
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev              # Start frontend on port 5173
```

## Default Admin Credentials
- Email: lounge@gmail.com
- Password: 12345

## Environment Variables
Edit `backend/.env` file to configure:
- Database connection (host, user, password, database name)
- JWT secret key
- Server port

## API Endpoints

### Admin
- POST `/api/admin/login` - Admin login
- GET `/api/admin/profile` - Get admin profile (protected)

### Users
- GET `/api/users` - Get all users (protected)
- GET `/api/users/:id` - Get user by ID (protected)
- POST `/api/users` - Create user (public for registration)
- PUT `/api/users/:id` - Update user (protected)
- DELETE `/api/users/:id` - Delete user (protected)

### Services
- GET `/api/services` - Get all services
- GET `/api/services/:id` - Get service by ID
- POST `/api/services` - Create service (protected)
- PUT `/api/services/:id` - Update service (protected)
- DELETE `/api/services/:id` - Delete service (protected)

### Team
- GET `/api/team` - Get all team members
- GET `/api/team/:id` - Get team member by ID
- POST `/api/team` - Create team member (protected)
- PUT `/api/team/:id` - Update team member (protected)
- DELETE `/api/team/:id` - Delete team member (protected)

### Contacts
- GET `/api/contacts` - Get all contacts (protected)
- GET `/api/contacts/:id` - Get contact by ID (protected)
- POST `/api/contacts` - Create contact (public)
- PUT `/api/contacts/:id` - Update contact status (protected)
- DELETE `/api/contacts/:id` - Delete contact (protected)

## Database Tables

### admins
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- username (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- created_at (TIMESTAMP)

### users
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- phone (VARCHAR)
- created_at (TIMESTAMP)

### services
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- title (VARCHAR)
- description (TEXT)
- icon (VARCHAR)
- created_at (TIMESTAMP)

### team_members
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- position (VARCHAR)
- bio (TEXT)
- image_url (VARCHAR)
- created_at (TIMESTAMP)

### contacts
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR)
- subject (VARCHAR)
- message (TEXT)
- status (ENUM: 'new', 'read', 'replied')
- created_at (TIMESTAMP)

## Features

### Admin Dashboard
- ✅ Secure login with JWT authentication
- ✅ Dashboard with statistics
- ✅ User management (CRUD)
- ✅ Services management (CRUD)
- ✅ Team management (CRUD)
- ✅ Contact messages management
- ✅ Status tracking for contacts

### Backend API
- ✅ RESTful API architecture
- ✅ MySQL database integration
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ CORS enabled
- ✅ Protected routes with middleware

## Notes
- Backend and frontend are completely separated
- Admin dashboard runs on a different port (3001)
- Main frontend runs on port 5173
- Backend API runs on port 5000
- All admin operations require authentication token
