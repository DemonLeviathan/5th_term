const { v4: uuidv4 } = require('uuid');

function validateCard(cardNumber) {
    console.log(`Validating card: ${cardNumber}`);
    return Math.random() < 0.5; // случайное значение для имитации проверки карты
}

function createOrder(customerCardNumber) {
    return new Promise((resolve, reject) => {
        if (validateCard(customerCardNumber)) {
            setTimeout(() => {
                const orderId = uuidv4();
                resolve(orderId);
            }, 5000);
        } else {
            reject("Card is not valid");
        }
    });
}

function proceedToPayment(orderId) {
    console.log(`Proceeding to payment for order: ${orderId}`);
    return new Promise((resolve, reject) => {
        if (Math.random() < 0.5) {
            resolve("Payment successful");
        } else {
            reject("Payment failed");
        }
    });
}

createOrder("1234-5678-9012-3456")
    .then(orderId => {
        console.log(`Order created: ${orderId}`);
        return proceedToPayment(orderId);
    })
    .then(paymentResult => {
        console.log(`Payment result: ${paymentResult}`);
    })
    .catch(error => {
        console.error("Error:", error);
    });

async function handleOrders() {
    try {
        const orderId = await createOrder("1234-5678-9012-3456");
        console.log(`Order created: ${orderId}`);
        const paymentResult = await proceedToPayment(orderId);
        console.log(`Payment result: ${paymentResult}`);
    } catch (error) {
        console.error("Error:", error);
    }
}

handleOrders();
