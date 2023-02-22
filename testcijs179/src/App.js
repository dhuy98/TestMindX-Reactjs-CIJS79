import React, { useState, useEffect } from "react";

import { Checkbox } from "primereact/checkbox";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    return savedTasks || [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: crypto.randomUUID(), name: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const handleToggleTaskCompletion = (id) => {
    const newTasks = [...tasks].map((t) => {
      if (t.id === id) {
        return {
          ...t,
          completed: !t.completed,
        };
      } else {
        return t;
      }
    });

    setTasks(newTasks);
  };

  const handleClearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };
  const handleClearAll = () => {
    setTasks([]);
  };
  let filteredTasks;
  if (filter === "all") {
    filteredTasks = tasks;
  } else if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  return (
    <div className="container">
      <h2>To Do App</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" value={newTask} onChange={handleNewTaskChange} />
        <button type="submit">Add Task</button>
      </form>
      <div className="task-filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <Checkbox
              className="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTaskCompletion(task.id)}
            />
            {task.name}
          </li>
        ))}
      </ul>
      <button onClick={handleClearCompletedTasks}>
        <i className="fa-solid fa-trash"></i>
        Clear Completed Tasks
      </button>
      <button onClick={handleClearAll}>
        <i className="fa-solid fa-trash"></i>
        Clear All Tasks
      </button>
    </div>
  );
}

export default App;
