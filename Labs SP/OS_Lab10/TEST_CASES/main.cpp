#include "tests.h"

using namespace std;

int main()
{
	if (tests::testFirst())
		cout << "-- First test: success" << endl;
	else
		cout << "-- First test: error" << endl;

	if (tests::testSecond())
		cout << "-- Second test: success" << endl;
	else
		cout << "-- Second test: error" << endl;

	if (tests::testThird())
		cout << "-- Third test: success" << endl;
	else
		cout << "-- Third test: error" << endl;

	if (tests::testFourth())
		cout << "-- Fourth test: success" << endl;
	else
		cout << "-- Fourth test4: error" << endl;

	if (tests::testFifth())
		cout << "-- Fifth test: success" << endl;
	else
		cout << "-- Fifth test: error" << endl;	

	if (tests::testSixth())
		cout << "-- Sixth test: success" << endl;
	else
		cout << "-- Sixth test: error" << endl;
}