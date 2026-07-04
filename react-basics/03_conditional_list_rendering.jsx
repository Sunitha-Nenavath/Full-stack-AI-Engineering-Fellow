// REACT NOTES: Conditional Rendering & List Rendering
// =====================================================
import { useState } from "react";

// ── CONDITIONAL RENDERING ─────────────────────────────────────────────────────
// React renders different UI based on conditions — using plain JS logic.

// METHOD 1: if/else (outside JSX)
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <p>Data: {data}</p>;
}

// METHOD 2: Ternary operator (inside JSX — most common)
function LoginButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}

// METHOD 3: && short-circuit (render something OR nothing)
// If left side is false, right side is never rendered
function NotificationBadge({ count }) {
  return (
    <div>
      <span>Notifications</span>
      {count > 0 && <span className="badge">{count}</span>}
      {/* badge only renders if count > 0 */}
    </div>
  );
}

// METHOD 4: Switch-like — render different components based on status
function StatusMessage({ status }) {
  const messages = {
    loading: <p>⏳ Loading...</p>,
    success: <p>✅ Done!</p>,
    error:   <p>❌ Something went wrong</p>,
  };
  return messages[status] || <p>Unknown status</p>;
}

// ── LIST RENDERING ────────────────────────────────────────────────────────────
// Use .map() to render arrays — React needs a unique `key` on each element.
//
// WHY KEYS MATTER:
// React uses keys to track which items changed, were added, or removed.
// Without keys, React re-renders the entire list even for small changes.
// Key must be UNIQUE AMONG SIBLINGS and STABLE (don't use array index if
// the list can be reordered or filtered).

const tasks = [
  { id: 1, text: "Learn React basics", done: true },
  { id: 2, text: "Build a todo app",   done: false },
  { id: 3, text: "Submit task",        done: false },
];

// Basic list rendering with map()
function TaskList() {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}               // key goes on the OUTERMOST element in the map
            style={{ textDecoration: task.done ? "line-through" : "none" }}>
          {task.text}
        </li>
      ))}
    </ul>
  );
}

// ── COMBINED: filtering + mapping ─────────────────────────────────────────────
function FilteredList() {
  const [filter, setFilter] = useState("all");

  const filtered = tasks.filter((task) => {
    if (filter === "done")    return task.done;
    if (filter === "pending") return !task.done;
    return true; // "all"
  });

  return (
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("done")}>Done</button>
      <button onClick={() => setFilter("pending")}>Pending</button>

      {filtered.length === 0 ? (
        <p>No tasks found.</p>                         // conditional: empty state
      ) : (
        <ul>
          {filtered.map((task) => (
            <li key={task.id}>{task.text}</li>         // list with key
          ))}
        </ul>
      )}
    </div>
  );
}

// ── EXTRACTING LIST ITEMS INTO A COMPONENT ────────────────────────────────────
// Best practice: don't write all the JSX inline — extract into a component.

function TaskItem({ task, onToggle }) {
  return (
    <li
      onClick={() => onToggle(task.id)}
      style={{
        cursor: "pointer",
        textDecoration: task.done ? "line-through" : "none",
        color: task.done ? "gray" : "black",
      }}
    >
      {task.done ? "✅" : "⬜"} {task.text}
    </li>
  );
}

function TaskListWithToggle() {
  const [items, setItems] = useState(tasks);

  const toggleTask = (id) => {
    setItems(items.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <ul>
      {items.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={toggleTask} />
      ))}
    </ul>
  );
}

// ── KEY RULES TO REMEMBER ─────────────────────────────────────────────────────
// Conditional rendering:
//   1. Use ternary (? :) when you want either A or B
//   2. Use && when you want either A or nothing
//   3. Use early return or if/else for complex conditions
//   4. Avoid nested ternaries — extract into a variable or component instead
//
// List rendering:
//   1. Always use .map() to render arrays (never a for loop inside JSX)
//   2. ALWAYS provide a unique key prop on the root element of each map item
//   3. Use item.id as key when possible — avoid array index as key
//   4. Keys must be unique among siblings only (not globally)
//   5. The key prop is NOT accessible inside the component (use a separate id prop if needed)
