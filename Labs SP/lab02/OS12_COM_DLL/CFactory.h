#pragma once				//   #3 -> CFactory.cpp
#include <objbase.h>

class CFactory : public IClassFactory
{
public:
	virtual HRESULT STDMETHODCALLTYPE QueryInterface(REFIID riid, void** ppv);
	//HRESULT: ��� ��� ������������� �������� ������. HRESULT - ��� ��� ������ ��� ��������� ����������, ������� ������������ � COM ��� ����������� ���������� ��������. 
	//���� ����� ����������� �������, �� ���������� S_OK, � ���� ���������� ������, �� ��� ������.
	//STDMETHODCALLTYPE: ��� ����������� ������, ������� ������������ ��� ��������� ���������� ������ ������� COM.
	// QueryInterface - ��� ���� �� ������� ���������� IUnknown, � �� ������������ ��� ������� (���������) ���������� �� ������ ����������, �������������� ��������.
	// riid � ppv ������������� ��� �������� ���� �������������� ����������(������ �� ����) � ����������� ��������� �� ���� ���������.
	virtual ULONG STDMETHODCALLTYPE AddRef(void);
	virtual ULONG STDMETHODCALLTYPE Release(void);


	virtual HRESULT STDMETHODCALLTYPE CreateInstance(IUnknown* pUO, const IID& id, void** ppv);
	//���� ����� ������� ����� ��������� ������� � ��������� ��������������� id. 
	//��������� pUO � ppv ������������� ��� �������� �������, ������� ����� �������������� ��� ��������, � ��� ����������� ��������� �� ����� ������.
	virtual HRESULT STDMETHODCALLTYPE LockServer(BOOL b);
	//���� ����� ��������� ��� ������������ ������ (��������, ������ COM), ����� ������������� ��� �������� �� ������

	CFactory();
	~CFactory();

private:
	ULONG m_lRef;	// ���������� ������ �� ������ CFactory
};