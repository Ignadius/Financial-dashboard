# Execute.bat

Save the file as start-dashboard.bat in the project root. Node.js and npm must be installed on the Windows
computer.


@echo off
cd /d "%~dp0"
if not exist node_modules call npm install
call npm run dev -- --open
pause
