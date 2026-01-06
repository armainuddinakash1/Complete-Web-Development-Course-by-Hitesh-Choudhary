const fs = require("fs");
const filePath = "./tasks.json";

const command = process.argv[2];
const argument = process.argv[3];

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (error) {
    return [];
  }
};
const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Task added ", task);
};
const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};
const listTasks = () => {
  const tasks = loadTasks()
    tasks.forEach((task, index) => {
        console.log(`${index + 1} - ${task.task}`)
    });
}
const removeTask = (argNo) => {
  const indexNo = argNo - 1
  let tasks = loadTasks()
  tasks = tasks.filter(task => task !== tasks[indexNo] )
  // console.log(tasks)
  saveTasks(tasks)
  
}

if (command === "add") {
  addTask(argument);
  // console.log("addTask")
} else if (command === "list") {
  listTasks();
  // console.log("listTasks")
} else if (command === "remove") {
  removeTask(parseInt(argument));
  // console.log("removeTask", argument)
} else console.log("Command Not Found");
