@echo off
chcp 65001

echo --имя этого bat-файла: %~n0
set "BatchName=%~n0"
for /f %%i in ('dir "%BatchName%.bat" /tc ^| findstr /i "%BatchName%.bat"') do set "creation_date=%%i" 

echo --этот bat-файл был создан: %creation_date%
echo --путь bat-файла: %~dpnx0
pause