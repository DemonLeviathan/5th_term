function calculateSquare(number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            setTimeout(() => {
                resolve(number * number);
            }, 1000);
        } else {
            reject("Invalid input. Please provide a valid number.");
        }
    });
}

function calculateCube(number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            setTimeout(() => {
                resolve(number * number * number);
            }, 2000);
        } else {
            reject("Invalid input. Please provide a valid number.");
        }
    });
}

function calculateFourthPower(number) {
    return new Promise((resolve, reject) => {
        if (typeof number === 'number') {
            setTimeout(() => {
                resolve(number ** 4);
            }, 3000);
        } else {
            reject("Invalid input. Please provide a valid number.");
        }
    });
}

const inputNumber = 3;
const inputNumber1 = "3";

const promises = [
    calculateSquare(inputNumber1),
    calculateCube(inputNumber),
    calculateFourthPower(inputNumber)
];

Promise.race(promises)
    .then(result => {
        console.log("First result:", result);
    })
    .catch(error => {
        console.error("Error:", error);
    });

Promise.any(promises)
    .then(result => {
        console.log("Any result:", result);
    })
    .catch(errors => {
        console.error("All promises rejected:", errors);
    });
