using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveObject : MonoBehaviour
{
    public float speed = 2.0f;  // �������� ����������� �������
    public Vector3 targetPosition;  // �������� ������� �������

    private void Update()
    {
        // ��������� ���������� ����� ������� �������� � ������� ��������
        float step = speed * Time.deltaTime;

        // ����������� ������� Vector3.MoveTowards ��� �������� �����������
        transform.position = Vector3.MoveTowards(transform.position, targetPosition, step);

        // ����� ���������� ���� �� ������ ��������� �����-���� �������������� ��������
        if (transform.position == targetPosition)
        {
            // ������ ������ ����
        }
    }
}

