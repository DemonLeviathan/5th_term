#pragma once
#include "pch.h"
#include "CFactory.h"
#include "SEQLOG.h"
#include "ICom.h"

extern ULONG g_ServerLocks;	//��� ������������ ���������� �������� ���������� �������

// ����������� ������
CFactory::CFactory() :m_lRef(1) {	//������������� ���������� m_lRef ��������� 1. ��� ������� ������ �� ������
	SEQ; LOG("CFactory::CFactory", ""); // ��� ����� �������� SEQ � LOG ��� ������ ���������� � �������� ������� CFactory � ������
	//SEQ ���������� ���������� ���������� ����� ��� ���� ������
	//LOG ���������� ��������� � ������.
};
CFactory::~CFactory() {
	SEQ; LOG("CFactory::~CFactory", ""); 
};

//���������� ������ QueryInterface
HRESULT STDMETHODCALLTYPE CFactory::QueryInterface(REFIID riid, void** ppv)
{
	SEQ; // ���������� ���������� ���������� ����� ��� ������ � ������.
	HRESULT rc = S_OK;	//S_OK �������� ���������� �������� �� ���������.
	*ppv = NULL;	//����� �������������� ��� �������� ��������� �� ����������� ���������.
	//  ����������, ����� ��������� ��� ��������:
	if (riid == IID_IUnknown)	
		*ppv = (IUnknown*)this;	// ��������� �� ������� ������ CFactory
	else if (riid == IID_IClassFactory)	
		*ppv = (IClassFactory*)this;
	else 
		rc = E_NOINTERFACE;	//����������� ��������� �� ��������������.

	if (rc == S_OK)
		this->AddRef();	//��������� ������� ������ �������.
	LOG("Cfactory::QueryInterface rc = ", rc);
	return rc;
};
ULONG STDMETHODCALLTYPE CFactory::AddRef(void) {
	SEQ;
	InterlockedIncrement((LONG*)&(this->m_lRef));//�������� ����������� �������� �������� ������ m_lRef �� 1
	LOG("CFactory::AddRef m_lRef = ", this->m_lRef);
	return this->m_lRef;	//���������� ����� �������� �������� ������.
};
ULONG STDMETHODCALLTYPE CFactory::Release(void) {
	SEQ;

	ULONG rc = this->m_lRef;
	if ((rc = InterlockedDecrement((LONG*)&(this->m_lRef))) == 0) 
		delete this;
	LOG("CFactory::Release rc = ", rc);
	return rc;
};


HRESULT STDMETHODCALLTYPE CFactory::CreateInstance(IUnknown* pUO, const IID& id, void** ppv) {
	SEQ;
	HRESULT rc = E_UNEXPECTED;	// ����������� ���� �������� �� ���������.

	OS12* pOs12;	//��������� �� ������ ���� OS12, ������� ����� ������ � ��������� ��� ���������.

	if (pUO != NULL)	//���� ���������� ��������� pUO �� ����� NULL, ��� ��������, ��� ��������� �������������� ������ (��� ������� � ���������� ��������� � COM).
		rc = CLASS_E_NOAGGREGATION;	//������ ���������.
	else if ((pOs12 = new OS12()) == NULL)	//��������� ����� ��������� ������� OS12. ���� �������� ��������� ������ �� ������� (�� ����, new ������ NULL), ��
		rc = E_OUTOFMEMORY;	//������ ��������� ������.
	else {
		rc = pOs12->QueryInterface(id, ppv); //��������� ���������� ���������� (id) �� �������������� ������� OS12
		pOs12->Release();	//��� ���������� �������� ������ �������, ��� ��� QueryInterface ����������� ������� ������
	}

	LOG("CFactory::CreateInstance rc = ", rc);
	return rc;
}
//��� ���������� ��� ������������� ������� COM.
HRESULT STDMETHODCALLTYPE CFactory::LockServer(BOOL b) {
	SEQ;
	HRESULT rc = S_OK;

	if (b)
		InterlockedIncrement((LONG*)&(g_ServerLocks));	//������ ������������, ���������� ����� �������� ���������� �������
	else 
		InterlockedDecrement((LONG*)&(g_ServerLocks));

	LOG("CFactory::LockServer b = ", b);
	return rc;
}
