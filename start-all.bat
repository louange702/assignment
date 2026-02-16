@echo off
echo Starting Louange Project...
echo.

start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul

start "Admin Dashboard" cmd /k "cd admin-dashboard && npm run dev"
timeout /t 3 /nobreak > nul

start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo All servers are starting...
echo Backend: http://localhost:5000
echo Admin Dashboard: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
