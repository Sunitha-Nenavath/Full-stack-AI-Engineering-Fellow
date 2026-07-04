// REACT NOTES: useState & useEffect
// ===================================
import { useState, useEffect } from "react";

// ── useState ──────────────────────────────────────────────────────────────────
// useState lets a component remember values between renders.
// When state changes, React re-renders the component automatically.
//
// Syntax: const [value, setValue] = useState(initialValue)
//   value    → current state (read-only — never mutate directly!)
//   setValue → function to update state (triggers re-render)

// ── COUNTER EXAMPLE (simplest useState) ──────────────────────────────────────
function Counter() {
  const [count, setCount] = useState(0); // initial value = 0

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ── STATE WITH OBJECTS ────────────────────────────────────────────────────────
// Always spread the old state when updating one field — never mutate directly!
function ProfileForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // spread + override
  };

  return (
    <div>
      <input name="name"  value={form.name}  onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <p>Preview: {form.name} — {form.email}</p>
    </div>
  );
}

// ── STATE WITH ARRAYS ─────────────────────────────────────────────────────────
// Never push/splice directly — always return a NEW array
function TagList() {
  const [tags, setTags] = useState(["React", "Python"]);
  const [input, setInput] = useState("");

  const addTag = () => {
    if (!input.trim()) return;
    setTags([...tags, input]);  // spread old tags + add new one
    setInput("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index)); // filter returns NEW array
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTag}>Add Tag</button>
      {tags.map((tag, i) => (
        <span key={i}>
          {tag} <button onClick={() => removeTag(i)}>×</button>
        </span>
      ))}
    </div>
  );
}

// ── useEffect ─────────────────────────────────────────────────────────────────
// useEffect runs AFTER the component renders.
// Use it for: API calls, subscriptions, timers, document title changes.
//
// Syntax: useEffect(callback, dependencyArray)
//
// THREE FORMS:
//   useEffect(() => { ... })         → runs after EVERY render
//   useEffect(() => { ... }, [])     → runs ONCE on mount only
//   useEffect(() => { ... }, [val])  → runs when `val` changes

// ── FORM 1: Run once on mount (like componentDidMount) ───────────────────────
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []); // [] = run once on mount only

  if (loading) return <p>Loading...</p>;
  return <p>{data?.title}</p>;
}

// ── FORM 2: Run when a specific value changes ─────────────────────────────────
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;
    console.log(`Searching for: ${query}`);
    // fetch(`/api/search?q=${query}`).then(...)
  }, [query]); // re-runs every time `query` prop changes

  return <div>{results.length} results</div>;
}

// ── FORM 3: Cleanup function ──────────────────────────────────────────────────
// Return a cleanup function to stop timers, cancel subscriptions, etc.
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1); // use callback form for state that depends on previous value
    }, 1000);

    return () => clearInterval(interval); // cleanup: runs before re-render or unmount
  }, []); // once on mount

  return <p>Timer: {seconds}s</p>;
}

// ── KEY RULES TO REMEMBER ─────────────────────────────────────────────────────
// useState:
//   1. Never mutate state directly (no arr.push, no obj.key = val)
//   2. Always use the setter function (setCount, setForm...)
//   3. State updates are ASYNCHRONOUS — don't rely on the new value immediately after calling setter
//   4. When new state depends on old state, use the callback form: setCount(prev => prev + 1)
//
// useEffect:
//   1. [] → runs once (on mount)
//   2. [dep] → runs when dep changes
//   3. No array → runs after every render (rarely what you want)
//   4. Return a cleanup function for timers and subscriptions
//   5. Don't forget to add all variables used inside the effect to the dependency array
