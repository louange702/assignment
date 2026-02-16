# Louange Project - Complete Structure

## 📁 Project Overview

This project consists of three separate applications:
1. **Backend API** - Node.js/Express REST API (Port 5000)
2. **Admin Dashboard** - React admin panel (Port 3001)
3. **Frontend** - React user-facing website (Port 5173)

---

## 📂 Directory Structure

```
louange/
│
├── backend/                          # Backend API Server
│   ├── config/
│   │   ├── database.js              # MySQL connection pool
│   │   └── initDb.js                # Database initialization script
│   ├── controllers/
│   │   ├── adminController.js       # Admin authentication logic
│   │   ├── userController.js        # User CRUD operations
│   │   ├── serviceController.js     # Service CRUD operations
│   │   ├── teamController.js        # Team CRUD operations
│   │   └── contactController.js     # Contact CRUD operations
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── routes/
│   │   ├── adminRoutes.js           # Admin endpoints
│   │   ├── userRoutes.js            # User endpoints
│   │   ├── serviceRoutes.js         # Service endpoints
│   │   ├── teamRoutes.js            # Team endpoints
│   │   └── contactRoutes.js         # Contact endpoints
│   ├── .env                         # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                    # Main server file
│
├── admin-dashboard/                  # Admin Dashboard (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Sidebar.jsx          # Navigation sidebar
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Admin login page
│   │   │   ├── Dashboard.jsx        # Dashboard with stats
│   │   │   ├── Users.jsx            # User management
│   │   │   ├── Services.jsx         # Service management
│   │   │   ├── Team.jsx             # Team management
│   │   │   └── Contacts.jsx         # Contact management
│   │   ├── App.jsx                  # Main app with routing
│   │   ├── App.css                  # Styles
│   │   ├── index.css
│   │   └── main.jsx                 # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── frontend/                         # Main Frontend (React)
│   ├── backend/                     # (Old backend - can be removed)
│   ├── src/
│   │   ├── Component/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── README.md                         # Main documentation
├── DATABASE_SCHEMA.md                # Database structure
├── API_DOCUMENTATION.md              # API endpoints guide
├── install.bat                       # Installation script
└── start-all.bat                     # Start all servers script
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Run the installation script
install.bat

# Or manually:
cd backend && npm install
cd ../admin-dashboard && npm install
cd ../frontend && npm install
```

### 2. Configure Database
Edit `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=louange_db
```

### 3. Initialize Database
```bash
cd backend
node config/initDb.js
```

### 4. Start All Servers
```bash
# Run the start script
start-all.bat

# Or manually:
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Admin Dashboard
cd admin-dashboard && npm run dev

# Terminal 3: Frontend
cd frontend && npm run dev
```

---

## 🔑 Access Points

| Application      | URL                        | Credentials              |
|------------------|----------------------------|--------------------------|
| Backend API      | http://localhost:5000      | N/A                      |
| Admin Dashboard  | http://localhost:3001      | lounge@gmail.com / 12345 |
| Frontend         | http://localhost:5173      | N/A                      |

---

## 🗄️ Database Tables

1. **admins** - Admin user accounts
2. **users** - Registered users
3. **services** - Services offered
4. **team_members** - Team member profiles
5. **contacts** - Contact form submissions

---

## 🔐 Security Features

- ✅ JWT authentication for admin routes
- ✅ Password hashing with bcrypt
- ✅ Protected API endpoints
- ✅ CORS enabled
- ✅ SQL injection prevention (parameterized queries)

---

## 📋 Admin Dashboard Features

### Dashboard Page
- Total users count
- Total services count
- Total team members count
- Total contact messages count

### Users Management
- View all registered users
- Add new users
- Edit user information
- Delete users
- Search and filter

### Services Management
- View all services
- Add new services
- Edit service details
- Delete services

### Team Management
- View all team members
- Add new team members
- Edit member profiles
- Delete team members

### Contacts Management
- View all contact messages
- Update message status (new/read/replied)
- View full message details
- Delete messages

---

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- MySQL (mysql2)
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv

### Admin Dashboard
- React 18
- React Router DOM
- Axios
- Vite

### Frontend
- React 18
- React Router DOM
- Vite

---

## 📝 Next Steps

1. ✅ Backend API created with all CRUD operations
2. ✅ Database schema designed and implemented
3. ✅ Admin dashboard with full functionality
4. ✅ Authentication system implemented
5. 🔄 Update frontend to use new backend API
6. 🔄 Add image upload functionality
7. 🔄 Add email notifications
8. 🔄 Add pagination for large datasets
9. 🔄 Add search and filtering
10. 🔄 Deploy to production

---

## 📞 Support

For issues or questions, refer to:
- `README.md` - Setup instructions
- `API_DOCUMENTATION.md` - API endpoints
- `DATABASE_SCHEMA.md` - Database structure

---

## 📄 License

This project is private and proprietary.
