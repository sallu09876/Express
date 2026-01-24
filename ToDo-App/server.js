const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let todos = [];

// Home route (optional but safe)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Get todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add todo
app.post("/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    task: req.body.task,
    completed: false,
  };
  todos.push(todo);
  res.json(todo);
});

// Update todo
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );

  res.json({ message: "Updated" });
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
