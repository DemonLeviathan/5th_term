#include <iostream>
#include <sys/types.h>
#include <windows.h>
using namespace std;

int main() {
	for (int i = 0; i < 1000; i++) {
		DWORD pid = GetCurrentProcessId();
		cout << pid << "-" << i + 1 << " " << endl;
		Sleep(2000);
	}
	return 0;
}