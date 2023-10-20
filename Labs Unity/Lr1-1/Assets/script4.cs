using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class task4 : MonoBehaviour
{
    public float speed = 5;
    private Rigidbody rb;
    [SerializeField] private float _jumpForce = 5f;
    private Renderer rend;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        rend = GetComponent<Renderer>();
    }

    void Update()
    {
        float moveHorizontal = Input.GetAxis("Horizontal");
        float moveVertical = Input.GetAxis("Vertical");

        Vector3 movement = new Vector3(moveHorizontal, 0.0f, moveVertical);
        rb.AddForce(movement * speed);

        if (Input.GetKeyDown(KeyCode.Space)) { Jump(); }
        if (Input.GetKeyDown(KeyCode.C)) { ChangeColor(); }
    }

    void Jump()
    {
        rb.velocity = new Vector3(rb.velocity.x, _jumpForce);
    }

    void ChangeColor()
    {
        Color newColor = new Color(Random.value, Random.value, Random.value);

        // Устанавливаем новый цвет материала
        rend.material.color = newColor;
    }
}
