import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (trimmedInput) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          title: trimmedInput,
          complete: false,
        },
      ]);
      setInput("");
    } else {
      alert("Enter your task");
    }
  };

  const handleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="input-container">
        <h1 className="title">📝To-do List</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter a task"
            className="input"
          />
          <button className="btn add-btn">Add</button>
        </form>
      </div>

      <div className="output-container">
        {tasks.length === 0 ? (
          <div className="placeholder">Take your time!</div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.complete ? "completed" : ""}`}
              >
                <span className="task-title">{task.title}</span>
                <div className="actions">
                  <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => handleComplete(task.id)}
                  />
                  <button className="btn delete-btn" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="clock">{clock}</div>
    </>
  );
}

export default App;
