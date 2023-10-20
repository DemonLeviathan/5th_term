function thirdJob(data) {
    return new Promise((resolve, reject) => {
        if (typeof data !== 'number') {
            reject("error");
        } else if (data % 2 === 1) {
            setTimeout(() => {
                resolve("odd");
            }, 1000);
        } else if (data % 2 === 0) {
            setTimeout(() => {
                reject("even");
            }, 2000);
        }
    });
}

thirdJob(5)
    .then(result => {
        console.log("Promise result:", result);
    })
    .catch(error => {
        console.error("Promise error:", error);
    });

async function handlePromise() {
    try {
        const result = await thirdJob(6);
        console.log("Async/await result:", result);
    } catch (error) {
        console.error("Async/await error:", error);
    }
}

handlePromise();
