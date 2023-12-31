#pragma comment(lib, "../x64/debug/OS11_HTAPI.lib")

#include <string>
#include <sstream>
#include "../OS11_HTAPI/pch.h"
#include "../OS11_HTAPI/HT.h"

using namespace std;

string intToString(int number);
int charToInt(char* str);
string incrementPayload(char* str);

int main(int argc, char* argv[])
{
	try 
	{
		ofstream logger("getData.log", ios::app);
		ht::HtHandle* ht = ht::open(L"../../MyTable.ht", true);
		if (ht) {
			cout << "-- open: success" << endl;
			logger << "-- open: success" << endl;
		}
		else {
			logger << "-- open: error" << endl;
			throw "-- open: error";
		}

		while (true) {
			int numberKey = rand() % 50;
			string key = intToString(numberKey);
			cout << key << endl;

			ht::Element* element = ht::get(ht, new ht::Element(key.c_str(), key.length() + 1));
			if (element)
			{
				cout << "-- get: success" << endl;
				logger << "-- get: success" << endl;
				string newPayload = incrementPayload((char*)element->payload);

				if (ht::update(ht, element, newPayload.c_str(), newPayload.length() + 1)) {
					cout << "-- update: success" << endl;
					logger << "-- update: success" << endl;
				}
				else {
					logger << "-- update: error" << endl;
					cout << "-- update: error" << endl;
				}
			}
			else {
				logger << "-- get: error" << endl;
				cout << "-- get: error" << endl;
			}

			Sleep(1000);
		}
	}
	catch (const char* msg)
	{
		cout << msg << endl;
	}
}

string intToString(int number)
{
	stringstream convert;
	convert << number;

	return convert.str();
}

int charToInt(char* str)
{
	stringstream convert;
	convert << str;
	int num;
	convert >> num;

	return num;
}

string incrementPayload(char* str)
{
	int oldNumberPayload = charToInt(str);
	int newNumberPayload = oldNumberPayload + 1;
	string newPayload = intToString(newNumberPayload);

	return newPayload;
}
