function secondJob() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("An error occurred");
        }, 3000);
    });
}

secondJob()
    .then(result => {
        console.log("Promise result:", result);
    })
    .catch(error => {
        console.error("Promise error:", error);
    });

async function handlePromise() {
    try {
        const result = await secondJob();
        console.log("Async/await result:", result);
    } catch (error) {
        console.error("Async/await error:", error);
    }
}

handlePromise();
