Write-Host "Starting Backend and Admin Dashboard..." -ForegroundColor Green
Write-Host ""

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm start"

# Wait 2 seconds
Start-Sleep -Seconds 2

# Start Admin Dashboard
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\admin-dashboard'; npm run dev"

Write-Host ""
Write-Host "Backend: http://localhost:5001" -ForegroundColor Cyan
Write-Host "Admin: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
