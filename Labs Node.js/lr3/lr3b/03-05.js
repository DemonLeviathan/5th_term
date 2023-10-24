function calculateSquare(number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            resolve(number * number);
        } else {
            reject("Invalid input. Please provide a valid number.");
        }
    });
}

function calculateCube(number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            resolve(number * number * number);
        } else {
            reject("Invalid input. Please provide a valid number.");
        }
    });
}

function calculateFourthPower(number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            resolve(number ** 4);
        } else {
            reject("Invalid input. Please provide a valid number.");
        }
    });
}

const inputNumber = "y";

const promises = [
    calculateSquare(inputNumber),
    calculateCube(inputNumber),
    calculateFourthPower(inputNumber)
];

Promise.all(promises)
    .then(results => {
        console.log("Results:", results);
    })
    .catch(error => {
        console.error("Error:", error);
    });
