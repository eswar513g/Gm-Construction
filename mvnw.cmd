@REM ----------------------------------------------------------------------------
@REM Maven Startup Script for Windows
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set "DIR=%~dp0"
if exist "%DIR%apache-maven-3.9.9\bin\mvn.cmd" (
    call "%DIR%apache-maven-3.9.9\bin\mvn.cmd" %*
) else (
    call mvn %*
)
