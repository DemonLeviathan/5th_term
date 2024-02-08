#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <windows.h>
#include <vector>
#include <string>

BOOL delRowFileTxt(LPWSTR FileName, DWORD row) {

    FILE* file = _wfopen(FileName, L"r");
    if (file == NULL) {
        wprintf(L"Could not open file %s\n", FileName);
        return FALSE;
    }

    std::vector<std::wstring> lines;
    wchar_t line[256];
    while (fgetws(line, sizeof(line) / sizeof(wchar_t), file)) {
        lines.push_back(line);
    }
    fclose(file);

    if (row < 1 || row > lines.size()) {
        wprintf(L"Row number out of range\n");
        return FALSE;
    }

    file = _wfopen(FileName, L"w");
    if (file == NULL) {
        wprintf(L"Could not open file %s\n", FileName);
        return FALSE;
    }

    for (DWORD i = 0; i < lines.size(); i++) {
        if (i + 1 != row) {
            fputws(lines[i].c_str(), file);
        }
    }
    fclose(file);

    return TRUE;
}


BOOL printFileTxt(LPWSTR FileName) {

    FILE* file = _wfopen(FileName, L"r");
    if (file == NULL) {
        wprintf(L"Could not open file %s\n", FileName);
        return FALSE;
    }

    wchar_t ch;
    while ((ch = fgetwc(file)) != WEOF)
        putwchar(ch);

    fclose(file);
    return TRUE;
}

int main() {

    SetConsoleOutputCP(65001);//UTF-8

    wchar_t temp[] = L"D:/Univer/5-th term/Labs OS/lab9/OS_lab9/OS09_02/OS09_1.txt";

    LPWSTR FileName = new wchar_t[wcslen(temp) + 1];
    wcscpy(FileName, temp);

    DWORD rowsToDelete[] = { 1, 3, 8, 10 };
    for (int i = 0; i < sizeof(rowsToDelete) / sizeof(DWORD); i++) {
        ///Если хотим удалять по другому то стереть - i
        if (!delRowFileTxt(FileName, rowsToDelete[i] - i)) {
            wprintf(L"Ошибка при удалении строки %d\n", rowsToDelete[i]);
            return 1;
        }
    }

    if (!printFileTxt(FileName)) {
        printf("Ошибка при выводе содержимого файла\n");
    }

    delete[] FileName;

    return 0;
}
