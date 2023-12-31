#ifdef _WIN64
#pragma comment(lib, "../x64/debug/OS11_HTAPI.lib")
#else
#pragma comment(lib, "../debug/OS11_HTAPI.lib")
#endif

#include "../OS11_HTAPI/pch.h"
#include "../OS11_HTAPI/HT.h"

#include <string>

using namespace std;

int main(int argc, char* argv[])
{
    ht::HtHandle* ht = nullptr;

    wstring fileName(argv[5], argv[5] + strlen(argv[5]));
    ht = ht::create(atoi(argv[1]), atoi(argv[2]), atoi(argv[3]), atoi(argv[4]), fileName.c_str());
    if (ht)
    {
        cout << "HT-Storage Created filename=" << ht->fileName << endl;
        cout << ", snapshotinterval=" << ht->secSnapshotInterval << endl;
        cout << ", capacity=" << ht->capacity << endl;
        cout << ", maxkeylength=" << ht->maxKeyLength << endl;
        cout << ", maxdatalength=" << ht->maxPayloadLength << endl;

        ht::close(ht);
    }
    else
        cout << "-- create: error" << endl;
}
