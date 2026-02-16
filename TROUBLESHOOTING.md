# Troubleshooting Guide - Louange Project

## Common Issues and Solutions

### 1. Database Connection Issues

#### Error: "Access denied for user"
**Solution:**
- Check your MySQL credentials in `backend/.env`
- Make sure MySQL server is running
- Verify the user has proper permissions

```bash
# Test MySQL connection
mysql -u root -p
```

#### Error: "Database does not exist"
**Solution:**
- Run the database initialization script:
```bash
cd backend
node config/initDb.js
```

---

### 2. Port Already in Use

#### Error: "Port 5000 is already in use"
**Solution:**
- Change the port in `backend/.env`:
```env
PORT=5001
```
- Update API calls in admin dashboard and frontend to use new port

#### Error: "Port 3001 is already in use"
**Solution:**
- Change the port in `admin-dashboard/vite.config.js`:
```javascript
server: {
  port: 3002
}
```

---

### 3. CORS Issues

#### Error: "CORS policy blocked"
**Solution:**
- Verify CORS is enabled in `backend/server.js`
- Add specific origins if needed:
```javascript
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5173']
}));
```

---

### 4. Authentication Issues

#### Error: "No token provided" or "Invalid token"
**Solution:**
- Clear browser localStorage and login again
- Check if token is being sent in headers:
```javascript
headers: { Authorization: `Bearer ${token}` }
```

#### Error: "jwt malformed"
**Solution:**
- Token might be corrupted
- Clear localStorage and login again
- Check JWT_SECRET in `.env` file

---

### 5. Module Not Found Errors

#### Error: "Cannot find module 'express'"
**Solution:**
- Install dependencies:
```bash
cd backend
npm install
```

#### Error: "Cannot find module 'react'"
**Solution:**
```bash
cd admin-dashboard
npm install
```

---

### 6. Database Initialization Fails

#### Error: "ER_NOT_SUPPORTED_AUTH_MODE"
**Solution:**
- Update MySQL authentication method:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

---

### 7. Admin Login Not Working

#### Issue: Cannot login with default credentials
**Solution:**
1. Check if admin was created:
```sql
USE louange_db;
SELECT * FROM admins;
```

2. If no admin exists, run:
```bash
cd backend
node config/initDb.js
```

3. Verify credentials:
   - Email: lounge@gmail.com
   - Password: 12345

---

### 8. Frontend Not Connecting to Backend

#### Issue: API calls failing
**Solution:**
1. Verify backend is running on port 5000
2. Check API URL in frontend code
3. Ensure CORS is enabled
4. Check browser console for errors

---

### 9. npm Install Fails

#### Error: "npm ERR! code ENOENT"
**Solution:**
- Make sure you're in the correct directory
- Delete `node_modules` and `package-lock.json`, then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### 10. Vite Build Errors

#### Error: "Failed to resolve import"
**Solution:**
- Clear Vite cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## Debugging Tips

### 1. Check Backend Logs
- Backend console shows all API requests
- Look for error messages and stack traces

### 2. Check Browser Console
- Open Developer Tools (F12)
- Check Console tab for JavaScript errors
- Check Network tab for failed API calls

### 3. Test API Endpoints
Use tools like Postman or curl:
```bash
# Test backend is running
curl http://localhost:5000

# Test login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"lounge@gmail.com","password":"12345"}'
```

### 4. Check Database
```sql
-- Connect to MySQL
mysql -u root -p

-- Use database
USE louange_db;

-- Check tables
SHOW TABLES;

-- Check admin
SELECT * FROM admins;

-- Check users
SELECT * FROM users;
```

---

## Performance Issues

### Slow Database Queries
**Solution:**
- Add indexes to frequently queried columns
- Optimize queries with EXPLAIN
- Consider connection pooling (already implemented)

### Slow Frontend Loading
**Solution:**
- Build for production: `npm run build`
- Enable compression
- Optimize images
- Use lazy loading

---

## Security Checklist

- [ ] Change default admin password
- [ ] Update JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Enable rate limiting
- [ ] Validate all user inputs
- [ ] Use environment variables for sensitive data
- [ ] Keep dependencies updated
- [ ] Enable SQL injection protection (already implemented)

---

## Getting Help

### Check Documentation
1. `README.md` - Setup instructions
2. `API_DOCUMENTATION.md` - API reference
3. `DATABASE_SCHEMA.md` - Database structure
4. `PROJECT_STRUCTURE.md` - Project overview

### Common Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
node config/initDb.js # Initialize database
npm start            # Start server
npm run dev          # Start with nodemon

# Admin Dashboard
cd admin-dashboard
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
```

---

## Reset Everything

If all else fails, start fresh:

```bash
# 1. Drop database
mysql -u root -p
DROP DATABASE louange_db;
exit;

# 2. Delete node_modules
cd backend && rm -rf node_modules package-lock.json
cd ../admin-dashboard && rm -rf node_modules package-lock.json
cd ../frontend && rm -rf node_modules package-lock.json

# 3. Reinstall
cd ../backend && npm install
cd ../admin-dashboard && npm install
cd ../frontend && npm install

# 4. Initialize database
cd ../backend && node config/initDb.js

# 5. Start servers
npm start
```

---

## Contact Support

If you continue to experience issues:
1. Check error messages carefully
2. Search for similar issues online
3. Review the documentation
4. Check MySQL and Node.js versions
