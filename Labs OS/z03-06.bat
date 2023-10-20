@echo off
chcp 65001
echo строка параметров: %*
echo режим: %1
echo имя файла: %2
rem
if "%~1"=="" (
    echo ОШИБКА: Не указан режим. Возможные режимы: удалить, создать!
    exit /b 1
)
rem
if /i "%~1" neq "delete" if /i "%~1" neq "create" (
    echo ОШИБКА: Неверно задан режим!
    exit /b 1
)
rem
if "%~2"=="" (
    echo ОШИБКА: Не указано имя файла!
    exit /b 1
)
rem
if /i "%~1"=="create" (
    if exist "%~2" (
        echo ОШИБКА: Файл уже существует!
        exit /b 1
    ) 
    echo Файл создан: %~2 
    echo. > "%~2"
) else if /i "%~1"=="delete" (
    if exist "%~2" (
        del "%~2"
        echo Файл %~2 удален
    ) else (
        echo ОШИБКА: Файла "%~2" не существует!
    )
)

pause
