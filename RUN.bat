@echo off
echo ========================================
echo Louange Project - One Command Setup
echo ========================================
echo.

REM Get MySQL password
set /p DB_PASSWORD="Enter your MySQL password (press Enter if none): "

echo.
echo [1/5] Configuring database...
(
echo PORT=5000
echo DB_HOST=localhost
echo DB_USER=root
echo DB_PASSWORD=%DB_PASSWORD%
echo DB_NAME=louange_db
echo JWT_SECRET=louange_secret_key_2024_change_in_production
) > backend\.env
echo Done!

echo.
echo [2/5] Installing backend...
cd backend
call npm install --silent
echo Done!

echo.
echo [3/5] Installing admin dashboard...
cd ..\admin-dashboard
call npm install --silent
echo Done!

echo.
echo [4/5] Creating database...
cd ..\backend
call node config\initDb.js
echo Done!

echo.
echo [5/5] Starting servers...
echo.
echo Backend: http://localhost:5000
echo Admin: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Login: lounge@gmail.com / 12345
echo.

start "Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul
start "Admin Dashboard" cmd /k "cd admin-dashboard && npm run dev"
timeout /t 2 /nobreak > nul
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo All servers started!
echo Open: http://localhost:3001
echo ========================================
