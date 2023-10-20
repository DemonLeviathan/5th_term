@echo off
chcp 65001

echo строка параметров: %*

set "param1=%~1"
echo --параметр 1: %param1%
set "param2=%~2"
echo --параметр 2: %param2%
set "param3=%~3"
echo --параметр 3: %param3%
set "param4=%~4"
echo --параметр 4: %param4%
pause
