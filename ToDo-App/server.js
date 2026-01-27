const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

/* ------------------ MongoDB Connection ------------------ */
const mongoURL =
  "mongodb+srv://sallu2004mkt_db_user:qScniugwZiJo6ne7@cluster0.hnozqxf.mongodb.net/Tasks?appName=mongosh+2.5.10";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });

/* ------------------ Todo Schema ------------------ */
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

/* ------------------ Routes ------------------ */

// Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort({ _id: -1 });
  res.json(todos);
});

// Add todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
  });

  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

// Toggle completed
app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.completed = !todo.completed;
  await todo.save();

  res.json(todo);
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* ------------------ Start Server ------------------ */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
