@echo off

REM Move to the Financial Dashboard project folder.
cd /d "C:\Users\Ignacio\Documents\Coding\Financial dashboard"

REM Stop if the project folder cannot be found.
if errorlevel 1 (
    echo Project folder not found.
    pause
    exit /b 1
)

REM Install dependencies only if node_modules does not exist.
if not exist node_modules (
    echo Installing dependencies...
    call npm install

    REM Stop if npm install fails.
    if errorlevel 1 (
        echo Dependency installation failed.
        pause
        exit /b 1
    )
)

REM Start the Vite development server.
call npm run dev

REM Keep the window open if the server stops or fails.
pause