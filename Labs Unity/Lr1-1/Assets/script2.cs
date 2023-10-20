using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveObject : MonoBehaviour
{
    public float speed = 2.0f;  // Скорость перемещения объекта
    public Vector3 targetPosition;  // Конечная позиция объекта

    private void Update()
    {
        // Вычислите расстояние между текущей позицией и целевой позицией
        float step = speed * Time.deltaTime;

        // Используйте функцию Vector3.MoveTowards для плавного перемещения
        transform.position = Vector3.MoveTowards(transform.position, targetPosition, step);

        // После достижения цели вы можете выполнить какие-либо дополнительные действия
        if (transform.position == targetPosition)
        {
            // Объект достиг цели
        }
    }
}

