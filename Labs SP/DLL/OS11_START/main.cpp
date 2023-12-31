#ifdef _WIN64
#pragma comment(lib, "../x64/debug/OS11_HTAPI.lib")
#else
#pragma comment(lib, "../debug/OS11_HTAPI.lib")
#endif

#include <conio.h>
#include "../OS11_HTAPI/pch.h"
#include "../OS11_HTAPI/HT.h"

#include <string>

using namespace std;

int main(int argc, char* argv[])
{
    ht::HtHandle* ht = nullptr;

    wstring fileName(argv[1], argv[1] + strlen(argv[1]));
    ht = ht::open(fileName.c_str());
    if (ht)
    {
        wcout << "HT-Storage Start filename=" << ht->fileName << endl;
        cout << ", snapshotinterval=" << ht->secSnapshotInterval << endl;
        cout << ", capacity=" << ht->capacity << endl;
        cout << ", maxkeylength=" << ht->maxKeyLength << endl;
        cout << ", maxdatalength=" << ht->maxPayloadLength << endl << endl;

        while (!kbhit())
            SleepEx(0, TRUE);

        ht::close(ht);
    }
    else
        cout << "-- open: error" << endl;
}