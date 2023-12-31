#pragma comment(lib, "../x64/debug/OS11_HTAPI.lib")

#include <string>
#include <sstream>
#include "../OS11_HTAPI/pch.h"
#include "../OS11_HTAPI/HT.h"

using namespace std;

string intToString(int number);

int main(int argc, char* argv[])
{
	try 
	{
		ht::HtHandle* ht = ht::open(L"../../MyTable.ht", true);
		ofstream logger("deleteData.log", ios::app);
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

			ht::Element* element = new ht::Element(key.c_str(), key.length() + 1);
			if (ht::deleteEl(ht, element)) {
				cout << "-- delete: success" << endl;
				logger << "-- delete: success" << endl;
			}
			else {
				logger << "-- delete: error" << endl;
				cout << "-- delete: error" << endl;
			}

			delete element;

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
