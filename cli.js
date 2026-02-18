let fs = require("fs");

let command = process.argv[2]; // add, delete, list
let task = process.argv[3]; // todo text or index
const FILE = "todos.json";

// Load todos from file
function loadTodos() {
  if (!fs.existsSync(FILE)) return [];
  const data = fs.readFileSync(FILE, "utf-8");
  return JSON.parse(data);
}

// Save todos to file
function saveTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

// ADD a todo
if (command === "add") {
  if (!task) {
    console.log(" Please provide a todo");
    process.exit(1);
  }
  const todos = loadTodos();
  todos.push(task);
  saveTodos(todos);
  console.log(" Todo added:", task);
}

// DELETE a todo
else if (command === "delete") {
  // if (task === undefined) {
  //   console.log(" Please provide index to delete");
  //   process.exit(1);
  // }
  const index = Number(task);
  const todos = loadTodos();
  // if (index < 0 || index >= todos.length) {
  //   console.log(" Invalid index");
  //   process.exit(1);
  // }
  const removed = todos.splice(index, 1);
  saveTodos(todos);
  console.log(" Todo deleted:", removed[0]);
}

// LIST all todos
// else if (command === "list") {
//   const todos = loadTodos();
//   if (todos.length === 0) {
//     console.log("No todos yet!");
//   } else {
//     console.log(" Todos:");
//     todos.forEach((t, i) => console.log(`${i}: ${t}`));
//   }
// }

// Unknown command
else {
  console.log(" Unknown command. Use add, delete, or list.");
}
