function firstJob() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello World");
        }, 2000);
    });
}

firstJob()
    .then(result => {
        console.log("Promise result:", result);
    })
    .catch(error => {
        console.error("Promise error:", error);
    });

async function handlePromise() {
    try {
        const result = await firstJob();
        console.log("Async/await result:", result);
    } catch (error) {
        console.error("Async/await error:", error);
    }
}

handlePromise();
