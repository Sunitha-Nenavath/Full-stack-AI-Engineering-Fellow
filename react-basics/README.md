# React Basics — Notes & Todo App

**Fellow:** Nenavath Sunitha
**Program:** Dev Weekends Fellowship 2026
**Task:** React Basics (Worth 10 points)

---

## What's Inside

| File | Topic |
|---|---|
| `01_jsx_components_props.jsx` | JSX syntax, functional components, props, default props |
| `02_useState_useEffect.jsx` | useState (primitives, objects, arrays), useEffect (3 forms + cleanup) |
| `03_conditional_list_rendering.jsx` | Ternary, &&, early return, .map() with keys, filtering |
| `todo-app/src/TodoApp.jsx` | Full working Todo App using all concepts |

---

## 1. JSX & Functional Components

JSX looks like HTML but compiles to `React.createElement()` calls. Every
component is a JavaScript function that returns JSX.

```jsx
// Functional component with props
function UserCard({ name, role, cgpa = 0 }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{role} — CGPA: {cgpa}</p>
    </div>
  );
}

// Usage (parent passes props to child)
<UserCard name="Sunitha" role="AI/ML Engineer" cgpa={8.74} />
```

**JSX gotchas vs HTML:**
- `class` → `className`
- `for` → `htmlFor`
- Events are camelCase: `onClick`, `onChange`, `onKeyDown`
- Must return ONE root element — wrap siblings in `<>...</>`
- Props are read-only inside the child component

---

## 2. useState & useEffect

### useState — local component memory

```jsx
const [count, setCount] = useState(0);

// Updating state (always use the setter, never mutate directly!)
setCount(count + 1);
setCount(prev => prev + 1);  // callback form when new state depends on old

// Updating object state (spread to avoid losing other fields)
setForm({ ...form, name: "Sunitha" });

// Updating array state (return new array, never push/splice)
setItems([...items, newItem]);              // add
setItems(items.filter(i => i.id !== id));  // remove
setItems(items.map(i => i.id === id ? {...i, done: true} : i)); // update
```

### useEffect — side effects after render

```jsx
// Runs once on mount
useEffect(() => {
  fetch("/api/data").then(...);
}, []);

// Runs when `query` changes
useEffect(() => {
  console.log("Query changed:", query);
}, [query]);

// Cleanup (stops timer before re-render or unmount)
useEffect(() => {
  const interval = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(interval);
}, []);
```

---

## 3. Conditional Rendering

```jsx
// Ternary — show A or B
{isLoading ? <Spinner /> : <Content />}

// && — show A or nothing
{count > 0 && <Badge>{count}</Badge>}

// Early return — complex conditions
if (error) return <ErrorPage />;
if (loading) return <LoadingPage />;
return <MainContent />;
```

---

## 4. List Rendering

```jsx
// Always use .map(), always provide a key
{items.map((item) => (
  <li key={item.id}>{item.text}</li>
))}

// Filter + map (common pattern)
{items
  .filter(item => !item.done)
  .map(item => <TaskItem key={item.id} task={item} />)
}
```

**Key rules:**
- `key` must be unique among siblings
- Use `item.id` as key, not array index (unless list is static)
- `key` goes on the outermost JSX element returned from `.map()`

---

## Todo App — Features & Concepts Used

The app in `todo-app/src/TodoApp.jsx` demonstrates every acceptance criterion:

| Feature | Concept Used |
|---|---|
| Add/delete/toggle tasks | useState with arrays |
| Input controlled component | useState with string |
| Filter (All / Pending / Done) | Derived state + .filter() |
| Priority badge | Conditional rendering (&&) |
| Empty state message | Conditional rendering (ternary) |
| "Clear completed" button | Conditional rendering (&&) |
| Stats (total/done/pending) | Props passed to child component |
| Document title updates | useEffect with [todos] dependency |
| Mount log | useEffect with [] (runs once) |
| List of todos | .map() with key={todo.id} |

### How to run the app

```bash
npm create vite@latest todo-app -- --template react
cd todo-app
npm install
# Replace src/App.jsx content with:
# import TodoApp from './TodoApp.jsx'
# export default function App() { return <TodoApp /> }
# Copy TodoApp.jsx into src/
npm run dev
```

---

## Key Takeaways

1. Components are just functions — they receive props and return JSX.
2. State (`useState`) makes components dynamic — changing state triggers a re-render.
3. `useEffect` is for anything that happens outside the render — fetching, timers, subscriptions.
4. Conditional rendering uses plain JS (`? :`, `&&`, early return) — no special syntax.
5. List rendering uses `.map()` — always with a stable, unique `key`.
6. Data flows ONE WAY — parent to child via props. Child communicates back by calling a function passed as a prop.
