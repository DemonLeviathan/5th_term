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
set /a num3=param3

set /a sum=%num1% + %num2% 
set /a mul=%num1% * %num2%
set /a s=%num3% / %num2%
set /a def=%num2% - %num1%
set /a res=(%num2% - %num1%) * (%num1% - %num2%)

echo Сумма: %sum%
echo Произведение: %mul%
echo Деление: %s%
echo Разность: %def%
echo Результат: %res%
pause