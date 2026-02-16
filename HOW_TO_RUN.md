# 🚀 HOW TO RUN - 2 STEPS ONLY

## Step 1: Setup (First Time Only)

**Double-click this file:**
```
setup.bat
```

It will ask for your MySQL password, then automatically:
- Configure database
- Install all dependencies
- Create database and tables
- Create default admin account

---

## Step 2: Start Everything

**Double-click this file:**
```
start-all.bat
```

This starts:
- Backend (Port 5000)
- Admin Dashboard (Port 3001)
- Frontend (Port 5173)

---

## Step 3: Login

Open browser: **http://localhost:3001**

Login:
- Email: **lounge@gmail.com**
- Password: **12345**

---

## That's It! 🎉

### If Something Goes Wrong:

**MySQL not running?**
- Start MySQL service

**Port already in use?**
- Close other programs
- Or change port in `backend\.env`

**Need to reset?**
- Delete `backend\node_modules` folder
- Delete `admin-dashboard\node_modules` folder
- Run `setup.bat` again

---

## Quick Summary

1. **First time:** Run `setup.bat`
2. **Every time:** Run `start-all.bat`
3. **Open:** http://localhost:3001
4. **Login:** lounge@gmail.com / 12345

Done! 🚀
