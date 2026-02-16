@echo off
echo ========================================
echo Louange Project - Automated Setup
echo ========================================
echo.

REM Get MySQL password
set /p DB_PASSWORD="Enter your MySQL password (or press Enter if no password): "

echo.
echo Step 1: Configuring database...
(
echo PORT=5000
echo DB_HOST=localhost
echo DB_USER=root
echo DB_PASSWORD=%DB_PASSWORD%
echo DB_NAME=louange_db
echo JWT_SECRET=louange_secret_key_2024_change_in_production
) > backend\.env
echo Database configured!

echo.
echo Step 2: Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Step 3: Installing admin dashboard dependencies...
cd ..\admin-dashboard
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install admin dependencies
    pause
    exit /b 1
)

echo.
echo Step 4: Creating database and tables...
cd ..\backend
call node config\initDb.js
if errorlevel 1 (
    echo ERROR: Failed to create database
    echo Make sure MySQL is running!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next step: Run start-all.bat to start the servers
echo.
pause
