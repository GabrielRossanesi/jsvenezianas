@echo off
setlocal
title JS Venezianas - Servidor local

cd /d "%~dp0"

where node.exe >nul 2>&1
if errorlevel 1 (
  echo.
  echo [ERRO] O Node.js nao foi encontrado neste computador.
  echo Instale o Node.js e execute este arquivo novamente.
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo.
  echo Instalando as dependencias do site pela primeira vez...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo [ERRO] Nao foi possivel instalar as dependencias.
    echo Verifique sua conexao com a internet e tente novamente.
    echo.
    pause
    exit /b 1
  )
)

echo.
echo Iniciando o site JS Venezianas...
echo O navegador sera aberto em http://localhost:5173
echo Para encerrar o servidor, pressione Ctrl+C nesta janela.
echo.

start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:5173'"
call npm.cmd run dev -- --host 0.0.0.0

if errorlevel 1 (
  echo.
  echo [ERRO] O servidor foi encerrado com um erro.
  pause
)

endlocal
