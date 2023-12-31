#include <objbase.h>
#include <iostream>
#include "../OS12_COM_DLL/INTERFACE.h"

#define IERR(s)    std::cout<<"error "<<s<<std::endl
#define IRES(s,r)  std::cout<<s<<r<<std::endl

IAdder* pIAdder = nullptr;
IMultiplier* pMultiplier = nullptr;


int main()
{
	IUnknown* pIUnknown = NULL;
	CoInitialize(NULL);// инициализация библиотеки OLE32
	//создает экземпляр COM-объекта, используя его CLSID
	HRESULT hr0 = CoCreateInstance(	CLSID_CA, //идентификатор класса объекта, который вы хотите создать
									NULL,	//ля передачи параметров конструктору
									CLSCTX_INPROC_SERVER, //  контекст, в котором будет создан объект
									IID_IUnknown, //идентификатор интерфейса, который вы хотите получить от созданного объекта.
									(void**)&pIUnknown);	//сохранен указатель на интерфейс IUnknown, который будет получен после создания объекта
	//HRESULT - это тип данных, который используется для хранения результатов операций в Windows, включая COM - операции.
	//HRESULT будет содержать значение S_OK. В случае ошибки, HRESULT будет содержать код ошибки, который поможет определить причину и характер ошибки.
	//CLSCTX_INPROC_SERVER означает, что объект будет создан в том же процессе, что и вызывающий код. Это означает, что объект будет работать внутри того же процесса, что и ваше приложение, и будет иметь доступ к памяти и ресурсам этого процесса.
	
	if (SUCCEEDED(hr0))
	{
		std::cout << "CoCreateInstance succeeded" << std::endl;
		if (SUCCEEDED(pIUnknown->QueryInterface(IID_IAdder, (void**)&pIAdder)))
		{
			{
				double z = 0.0;
				if (!SUCCEEDED(pIAdder->Add(2.0, 3.0, &z)))  IERR("IAdder::Add");
				else IRES("IAdder::Add 2+3= ", z);
			}
			{
				double z = 0.0;
				if (!SUCCEEDED(pIAdder->Sub(2.0, 3.0, &z)))  IERR("IAdder::Sub");
				else IRES("IAdder::Sub 2-3= ", z);
			}
			if (SUCCEEDED(pIAdder->QueryInterface(IID_IMultiplier, (void**)&pMultiplier)))
			{
				{
					double z = 0.0;
					if (!SUCCEEDED(pMultiplier->Mul(2.0, 3.0, &z))) IERR("IMultiplier::Mul");
					else IRES("Multiplier::Mul 2*3= ", z);
				}
				{
					double z = 0.0;
					if (!SUCCEEDED(pMultiplier->Div(2.0, 3.0, &z))) IERR("IMultiplier::Div");
					else IRES("IMultiplier::Div 2/3= ", z);
				}
				if (SUCCEEDED(pMultiplier->QueryInterface(IID_IAdder, (void**)&pIAdder)))
				{
					double z = 0.0;
					if (!SUCCEEDED(pIAdder->Add(2.0, 3.0, &z))) IERR("IAdder::Add");
					else IRES("IAdder::Add 2+3= ", z);
					pIAdder->Release();
				}
				else  IERR("IMultiplier->IAdder");
				pMultiplier->Release();
			}
			else IERR("IAdder->IMultiplier");
			pIAdder->Release();
		}
		else  IERR("IAdder");
	}
	else  std::cout << "CoCreateInstance error" << std::endl;
	pIUnknown->Release();
	CoFreeUnusedLibraries();				// завершение работы с библиотекой                   
	system("pause");
	return 0;
}