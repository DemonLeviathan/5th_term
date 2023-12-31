#ifdef _WIN64
#pragma comment(lib, "../x64/debug/OS11_HTAPI.lib")
#else
#pragma comment(lib, "../debug/OS11_HTAPI.lib")
#endif

#include <string>
#include <sstream>
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

void updateElement(ht::HtHandle* ht, const string& key) {
	ht::Element* element = ht::get(ht, new ht::Element(key.c_str(), key.length() + 1));
	if (element)
	{
		cout << "-- get: success" << endl;
		string oldPayload((char*)element->payload);
		int oldNumberPayload = stoi(oldPayload);
		int newNumberPayload = oldNumberPayload + 1;
		string newPayload = to_string(newNumberPayload);

		if (ht::update(ht, element, newPayload.c_str(), newPayload.length() + 1))
			cout << "-- update: success" << endl;
		else
			cout << "-- update: error" << endl;
	}
	else
		cout << "-- get: error" << endl;
}

void updateElements(ht::HtHandle* ht) {
	while (true) {
		int numberKey = rand() % 50;
		string key = to_string(numberKey);
		cout << key << endl;

		updateElement(ht, key);

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

		updateElements(ht);
	}
	catch (const char* msg)
	{
		cout << msg << endl;
	}
}
