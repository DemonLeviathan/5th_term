#ifdef _WIN64
#pragma comment(lib, "../x64/debug/OS11_HTAPI.lib")
#else
#pragma comment(lib, "../debug/OS11_HTAPI.lib")
#endif

#include <string>
#include "../OS11_HTAPI/pch.h"
#include "../OS11_HTAPI/HT.h"

using namespace std;

void loadLibrary(HMODULE& hmdll) {
#ifdef _WIN64
    hmdll = LoadLibrary(L"D:\\Univer\\5-th term\\Labs SP\\DLL\\x64\\Debug\\OS11_HTAPI.dll");
#else
    hmdll = LoadLibrary(L"D:\\Univer\\5-th term\\Labs SP\\DLL\\x64\\Debug\\OS11_HTAPI.dll");
#endif
    if (!hmdll)
        throw "-- LoadLibrary failed";
    cout << "-- LoadLibrary success" << endl;
}

void openHT(HMODULE hmdll, ht::HtHandle*& ht, wstring filename) {
    auto open = (ht::HtHandle * (*)(const wchar_t*, bool)) GetProcAddress(hmdll, "open");
    ht = ht::open(filename.c_str(), true);
    if (ht)
        cout << "-- open: success" << endl;
    else
        throw "-- open: error";
}


void insertElements(HMODULE hmdll, ht::HtHandle* ht) {
    auto insert = (BOOL(*)(ht::HtHandle*, const ht::Element*)) GetProcAddress(hmdll, "insert");
    auto createInsertElement = (ht::Element * (*)(const void*, int, const void*, int)) GetProcAddress(hmdll, "createInsertElement");

    while (true) {
        int numberKey = rand() % 50;
        string key = to_string(numberKey);
        cout << key << endl;

        ht::Element* element = createInsertElement(key.c_str(), key.length() + 1, "0", 2);
        if (insert(ht, element))
            cout << "-- insert: success" << endl;
        else
            cout << "-- insert: error" << endl;

        delete element;

        Sleep(1000);
    }
}

int main(int argc, char* argv[])
{
    try
    {
        HMODULE hmdll;
        loadLibrary(hmdll);

        wstring filename(argv[1], argv[1] + strlen(argv[1]));
        ht::HtHandle* ht;
        openHT(hmdll, ht, filename);

        insertElements(hmdll, ht);
    }
    catch (const char* msg)
    {
        cout << msg << endl;
    }
}