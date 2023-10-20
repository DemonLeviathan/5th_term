@echo off
chcp 65001

echo строка параметров: %*

set "param1=%~1"
echo --параметр 1: %param1%
set "param2=%~2"
echo --параметр 2: %param2%
set "param3=%~3"
echo --параметр 3: %param3%

set /a num1=param1
set /a num2=param2

if "%param3%"=="+" (
    set /a res=%num1% + %num2%
) else if "%param3%"=="-" (
    set /a res=%num1% - %num2%
) else if "%param3%"=="*" (
    set /a res=%num1% * %num2%
) else if "%param3%"=="/" (
    set /a res=%num1% / %num2%
) else if "%param3%"=="%%" (
    set /a res=%num1% %% %num2%
) else (
    echo Неверный арифметический оператор
    goto end
)
:end
echo Результат: %res%
pause