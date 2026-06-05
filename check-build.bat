@echo off
cd /d D:\Project\Winall

echo === Verification TypeScript ===
call pnpm tsc --noEmit 2>&1

echo.
echo === Build Next.js ===
call pnpm next build 2>&1

pause
