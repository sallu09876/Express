const todoList = document.getElementById("todoList");
const taskInput = document.getElementById("taskInput");

// Load todos
async function loadTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();

  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}">
        ${todo.task}
      </span>
      <div class="actions">
        <span class="check" onclick="toggleTodo(${todo.id})">✔</span>
        <span class="delete" onclick="deleteTodo(${todo.id})">❌</span>
      </div>
    `;

    todoList.appendChild(li);
  });
}

// Toggle todo
async function toggleTodo(id) {
  await fetch(`/todos/${id}`, { method: "PUT" });
  loadTodos();
}

// Add todo
async function addTodo() {
  const task = taskInput.value.trim();
  if (!task) return;

  await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  });

  taskInput.value = "";
  loadTodos();
}

// Delete todo
async function deleteTodo(id) {
  await fetch(`/todos/${id}`, { method: "DELETE" });
  loadTodos();
}

// Initial load
loadTodos();
