@echo off
echo Starting Backend and Admin Dashboard...
echo.

start "Backend API" cmd /k "cd backend && npm start"
timeout /t 2 /nobreak > nul
start "Admin Dashboard" cmd /k "cd admin-dashboard && npm run dev"

echo.
echo Backend: http://localhost:5001
echo Admin: http://localhost:3001
echo.
