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

const listTasks = () => {
  const taskList = loadtasks();
  taskList.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
};

const removeTask = (index) => {
  const taskList = loadtasks();

  if (index < 1 || index > taskList.length) {
    console.log("Invalid index");
    return;
  }

  const removed = taskList.splice(index - 1, 1); // Adjust for 1-based index
  saveTasks(taskList);
  console.log(`Removed task: ${removed[0].task}`);
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
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Invalid command");
}
