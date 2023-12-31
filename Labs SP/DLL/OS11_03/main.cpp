#ifdef _WIN64
#pragma comment(lib, "../x64/debug/OS11_HTAPI.lib")
#else
#pragma comment(lib, "../debug/OS11_HTAPI.lib")
#endif

#include <string>
#include "../OS11_HTAPI/pch.h"
#include "../OS11_HTAPI/HT.h"

using namespace std;

void openHT(ht::HtHandle*& ht, wstring filename) {
	ht = ht::open(filename.c_str(), true);
	if (ht)
		cout << "-- open: success" << endl;
	else
		throw "-- open: error";
}

void removeElements(ht::HtHandle* ht) {
	while (true) {
		int numberKey = rand() % 50;
		string key = to_string(numberKey);
		cout << key << endl;

		ht::Element* element = new ht::Element(key.c_str(), key.length() + 1);
		if (ht::removeOne(ht, element))
			cout << "-- remove: success" << endl;
		else
			cout << "-- remove: error" << endl;

		delete element;

		Sleep(1000);
	}
}

int main(int argc, char* argv[])
{
	try
	{
		ht::HtHandle* ht;
		wstring filename(argv[1], argv[1] + strlen(argv[1]));
		openHT(ht, filename);

		removeElements(ht);
	}
	catch (const char* msg)
	{
		cout << msg << endl;
	}
}
