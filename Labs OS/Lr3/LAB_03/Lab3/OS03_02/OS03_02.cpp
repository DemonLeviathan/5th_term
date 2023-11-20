#include <iostream>
#include <Windows.h>


// CMD: tasklist /FI "IMAGENAME eq OS03_02*"

int main()
{
	std::cout << "OS03_02\n\n";

	LPCWSTR OS03_02_1 = L"D:\\Univer\\5-th term\\Labs OS\Lr3\\LAB_03\\Lab3\\Debug\\OS03_02_1.exe";
	LPCWSTR OS03_02_2 = L"D:\\Univer\\5-th term\\Labs OS\Lr3\\LAB_03\\Lab3\\Debug\\OS03_02_2.exe";


	STARTUPINFO si1;// структура для определения внешнего вида окна для нового процесса	(ширина и высота окна, его смещение, заголовок)
	STARTUPINFO si2;

	
	PROCESS_INFORMATION pi1;// структура с инфой о созданном процессе и его первичном потоке
	PROCESS_INFORMATION pi2;

	
	ZeroMemory(&si1, sizeof(STARTUPINFO));
	ZeroMemory(&si2, sizeof(STARTUPINFO));



	if (CreateProcess(
		OS03_02_1,			// lpApplicationName:	имя исполняемого модуля - exe иди другой тип (MS-DOS или OS/2)
		NULL,				// lpCommandLine:		параметры коммандной строки
		NULL,				// lpProcessAttributes: может ли возвращаемый дескриптор быть унаследован дочерними процессами (null - нельзя наследовать)
		NULL,				// lpThreadAttributes:	может ли возвращаемый дескриптор быть унаследован дочерними потоками (null - нельзя наследовать)
		FALSE,				// bInheritHandles:		true - каждый возвращаемый дескриптор наследуется дочерним процессом; false - не наследуется
		CREATE_NEW_CONSOLE, // dwCreationFlags:		флаги, управляющие приоритетом и параметрами процесса; конкретно этот создает новый инстанс консоли
		NULL,				// lpEnvironment:		блок конфигурации нового процесса (пары ключ-значение); если null, то конфигурация наследуется от родителя
		NULL,				// lpCurrentDirectory:	полный путь дочернего процесса; если null, то процесс создается в каталоге родительского процесса
		&si1,				// lpStartupInfo:		структура STARTUPINFO (внешний вид окна)
		&pi1))				// lpProcessInfo:		структура PROCESS_INFORMATION (дескрипторы процесса и первичного потока)
		std::cout << "[OK] OS03_02_1 created.\n";
	else 
		std::cout << "[ERROR] OS03_02_1 not created.\n";


	if (CreateProcess(OS03_02_2,
		NULL,
		NULL,
		NULL,
		FALSE,
		CREATE_NEW_CONSOLE, 
		NULL,
		NULL,
		&si2,
		&pi2))
		std::cout << "[OK] Process OS03_02_2 created.\n\n";
	else 
		std::cout << "[ERROR] OS03_02_2 not created.\n\n";


	for (short i = 1; i <= 100; ++i)
	{
		std::cout << i << ". PID = " << GetCurrentProcessId() << "\n";
		Sleep(1000);
	}


	return 0;
}


/*
Затем, с помощью функции ZeroMemory, вы устанавливаете все
байты в каждой из структур si1 и si2 в нулевые значения.

Это гарантирует, что все поля структур si1 и si2 будут иметь начальные значения, равные нулю.
Это важно, поскольку эти структуры содержат различные параметры и флаги,
которые могут влиять на поведение функции CreateProcess, которая, возможно,
будет использоваться для запуска новых процессов. Инициализация их нулевыми
значениями обеспечивает корректную работу этих параметров.

Таким образом, ZeroMemory в вашем коде обеспечивает начальную
инициализацию структур STARTUPINFO перед их использованием для
запуска процессов. Это важно для того, чтобы избежать непредсказуемого
поведения при работе с этими структурами.
*/