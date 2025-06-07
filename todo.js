const fs = require("fs");
const { argv } = require("process");
const filePath = "./tasks.json";

const loadtasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks));
};
const addTask = (task) => {
  const tasks = loadtasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Task added ", task);
};

const command = process.argv[2];
const argument = process.argv[3];
if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (coomand === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Invalid command");
}
