import { useState, useEffect } from "react";

// ── INDIVIDUAL TODO ITEM COMPONENT ────────────────────────────────────────────
// Demonstrates: functional component, props, conditional rendering
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        margin: "6px 0",
        borderRadius: "8px",
        backgroundColor: todo.done ? "#f0fdf4" : "#fff",
        border: "1px solid #e5e7eb",
        listStyle: "none",
      }}
    >
      {/* Checkbox — toggles done state */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        style={{ cursor: "pointer", width: 18, height: 18 }}
      />

      {/* Task text — strikethrough if done (conditional rendering) */}
      <span
        style={{
          flex: 1,
          textDecoration: todo.done ? "line-through" : "none",
          color: todo.done ? "#9ca3af" : "#111827",
          fontSize: "15px",
        }}
      >
        {todo.text}
      </span>

      {/* Priority badge — conditional rendering */}
      {todo.priority === "high" && (
        <span style={{ fontSize: "11px", color: "#ef4444", fontWeight: 600 }}>
          HIGH
        </span>
      )}

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: "none",
          border: "none",
          color: "#ef4444",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ✕
      </button>
    </li>
  );
}

// ── STATS COMPONENT ───────────────────────────────────────────────────────────
// Demonstrates: props, expressions in JSX, conditional rendering
function Stats({ todos }) {
  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  const pending = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "16px",
        fontSize: "13px",
        color: "#6b7280",
      }}
    >
      <span>Total: <strong>{total}</strong></span>
      <span>Done: <strong style={{ color: "#16a34a" }}>{done}</strong></span>
      <span>Pending: <strong style={{ color: "#f59e0b" }}>{pending}</strong></span>
      {total > 0 && (
        <span>Progress: <strong>{percent}%</strong></span>
      )}
    </div>
  );
}

// ── MAIN TODO APP COMPONENT ───────────────────────────────────────────────────
// Demonstrates: useState, useEffect, conditional rendering, list rendering
export default function TodoApp() {
  // ── STATE ──────────────────────────────────────────────────────────────────
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React fundamentals",     done: true,  priority: "high" },
    { id: 2, text: "Build a functional component", done: true,  priority: "normal" },
    { id: 3, text: "Master useState & useEffect",  done: false, priority: "high" },
    { id: 4, text: "Submit Fellowship task",        done: false, priority: "normal" },
  ]);

  const [inputText, setInputText]   = useState("");
  const [priority, setPriority]     = useState("normal");
  const [filter, setFilter]         = useState("all");   // "all" | "pending" | "done"
  const [title, setTitle]           = useState("My Todo List");

  // ── useEffect: update document title when todo count changes ───────────────
  useEffect(() => {
    const pending = todos.filter((t) => !t.done).length;
    document.title = pending > 0 ? `(${pending}) ${title}` : title;
  }, [todos, title]); // re-runs when todos or title changes

  // ── useEffect: log to console on first mount (runs once) ───────────────────
  useEffect(() => {
    console.log("TodoApp mounted ✅");
  }, []); // [] = run once on mount only

  // ── HANDLERS ──────────────────────────────────────────────────────────────
  const addTodo = () => {
    if (!inputText.trim()) return;
    const newTodo = {
      id: Date.now(),       // simple unique id
      text: inputText.trim(),
      done: false,
      priority,
    };
    setTodos([...todos, newTodo]);   // spread old + add new
    setInputText("");
    setPriority("normal");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.done));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  // ── DERIVED STATE: filtered list ───────────────────────────────────────────
  const filteredTodos = todos.filter((t) => {
    if (filter === "done")    return t.done;
    if (filter === "pending") return !t.done;
    return true;
  });

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "40px auto",
        fontFamily: "Inter, sans-serif",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        backgroundColor: "#f9fafb",
      }}
    >
      {/* Header */}
      <h1 style={{ margin: "0 0 4px", fontSize: "22px", color: "#111827" }}>
        📝 {title}
      </h1>
      <p style={{ margin: "0 0 20px", color: "#6b7280", fontSize: "13px" }}>
        Dev Weekends Fellowship — React Basics Task
      </p>

      {/* Stats component — passes todos as prop */}
      <Stats todos={todos} />

      {/* Input row */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        >
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={addTodo}
          style={{
            padding: "10px 18px",
            backgroundColor: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Add
        </button>
      </div>

      {/* Filter buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["all", "pending", "done"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              backgroundColor: filter === f ? "#6366f1" : "#e5e7eb",
              color: filter === f ? "#fff" : "#374151",
              fontWeight: filter === f ? 600 : 400,
              textTransform: "capitalize",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo list — conditional rendering for empty state */}
      {filteredTodos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#9ca3af", padding: "24px 0" }}>
          {filter === "done" ? "No completed tasks yet." : "No tasks here! Add one above."}
        </p>
      ) : (
        <ul style={{ padding: 0, margin: 0 }}>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      {/* Clear completed — only shown when there are completed tasks */}
      {todos.some((t) => t.done) && (
        <button
          onClick={clearCompleted}
          style={{
            marginTop: "16px",
            background: "none",
            border: "1px solid #d1d5db",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#6b7280",
            fontSize: "13px",
            width: "100%",
          }}
        >
          Clear completed tasks
        </button>
      )}
    </div>
  );
}
