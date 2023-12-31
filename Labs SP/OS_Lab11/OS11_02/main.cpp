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
		ofstream logger("insertData.log", ios::app);
		
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

			ht::Element* element = ht::createInsertElement(key.c_str(), key.length() + 1, "0", 2);
			if (ht::insert(ht, element)) {
				cout << "-- insert: success" << endl;
				logger << "-- insert: success" << endl;
			}
			else {
				cout << "-- insert: error" << endl;
				logger << "-- insert: error" << endl;
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
