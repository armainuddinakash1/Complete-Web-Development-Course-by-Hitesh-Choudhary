// 1
function simulateAsyncTask() {
    console.log("Task started");
    setTimeout(() => {
        console.log("Task finished");
    }, 2000);
}

// 2
function simulateMultipleTasks() {
    setTimeout(() => {
        console.log("Task 1 finished");
    }, 1000);
    setTimeout(() => {
        console.log("Task 2 finished");
    }, 2000);
    setTimeout(() => {
        console.log("Task 3 finished");
    }, 3000);
}

// 3
function fetchDataWithCallback(callback) {
  setTimeout(() => {
    callback("Fetched data");
  }, 2000);    
}

function callback(data) {
  console.log(data);
  
}

// simulateAsyncTask();
// simulateMultipleTasks();
fetchDataWithCallback(callback);
