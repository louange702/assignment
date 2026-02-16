@echo off
echo ========================================
echo Louange Project Setup
echo ========================================
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
echo.

echo Installing Admin Dashboard Dependencies...
cd ..\admin-dashboard
call npm install
echo.

echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Make sure MySQL is running
echo 2. Update backend/.env with your database credentials
echo 3. Run: cd backend ^&^& node config/initDb.js
echo 4. Start backend: cd backend ^&^& npm start
echo 5. Start admin dashboard: cd admin-dashboard ^&^& npm run dev
echo 6. Start frontend: cd frontend ^&^& npm run dev
echo.
pause
