import React, { useState, useEffect, useMemo, useCallback } from "react";
import './taskManager.css';

export default function TaskManager() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  // Load tasks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = useCallback(() => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTasks((prev) => [...prev, newTask]);
    setTask("");
  }, [task]);

  // Toggle complete
  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }, []);

  // Delete task
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Search filter (optimized)
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  return (
    <div className="task-container">
      <h2>Task Manager</h2>

      {/* Add Task */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Search Bar */}
      <input
        className="search-bar"
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map((t) => (
            <li key={t.id} className={t.completed ? "done" : ""}>
              <span onClick={() => toggleTask(t.id)}>{t.text}</span>

              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
