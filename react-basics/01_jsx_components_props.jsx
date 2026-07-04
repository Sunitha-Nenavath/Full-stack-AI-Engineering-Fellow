// REACT NOTES: JSX & FUNCTIONAL COMPONENTS
// ==========================================
// These are code-along notes with explanations.
// Not meant to run standalone — copy snippets into a React project to test.

// ── WHAT IS JSX? ──────────────────────────────────────────────────────────────
// JSX looks like HTML but it's actually JavaScript.
// Behind the scenes, React converts JSX into React.createElement() calls.
// Rule: Every JSX expression must return ONE parent element.

// ❌ Wrong — two siblings with no parent
// return <h1>Hello</h1><p>World</p>

// ✅ Correct — wrapped in a fragment
// return (
//   <>
//     <h1>Hello</h1>
//     <p>World</p>
//   </>
// )

// ── JSX DIFFERENCES FROM HTML ─────────────────────────────────────────────────
// class     → className       (class is a reserved word in JS)
// for       → htmlFor         (for is a reserved word in JS)
// onclick   → onClick         (camelCase event names)
// style     → style={{ }}     (object, not a string)

// Example:
// <div className="card" style={{ color: "red", fontSize: 16 }}>Hello</div>

// ── FUNCTIONAL COMPONENTS ─────────────────────────────────────────────────────
// A component is just a JavaScript function that returns JSX.
// Convention: Component names MUST start with a capital letter.

function Greeting() {
  return <h1>Hello, Sunitha!</h1>;
}

// Arrow function style (same thing):
const Greeting2 = () => {
  return <h1>Hello again!</h1>;
};

// ── PROPS ─────────────────────────────────────────────────────────────────────
// Props = "properties" = data passed FROM a parent TO a child component.
// Props are READ-ONLY — a child should never modify its own props.

// Child component — receives props as a parameter object
function UserCard({ name, role, cgpa }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>CGPA: {cgpa}</p>
    </div>
  );
}

// Default props — used when a prop isn't passed
function Badge({ label = "Fellow", color = "blue" }) {
  return <span style={{ backgroundColor: color }}>{label}</span>;
}

// Parent component — passes props to children
function App() {
  return (
    <div>
      <UserCard name="Sunitha" role="AI/ML Engineer" cgpa={8.74} />
      <UserCard name="Arjun" role="Full Stack Dev" cgpa={8.5} />
      <Badge label="Dev Weekends" color="purple" />
      <Badge /> {/* uses defaults: "Fellow", "blue" */}
    </div>
  );
}

// ── EXPRESSIONS IN JSX ────────────────────────────────────────────────────────
// Wrap any JS expression in { } inside JSX

function ExpressionDemo() {
  const name = "Sunitha";
  const score = 95;

  return (
    <div>
      <p>Name: {name}</p>
      <p>Score: {score}</p>
      <p>Grade: {score >= 90 ? "A" : "B"}</p>         {/* ternary */}
      <p>Upper: {name.toUpperCase()}</p>               {/* method call */}
      <p>Math: {score * 2}</p>                         {/* expression */}
    </div>
  );
}

// ── KEY RULES TO REMEMBER ─────────────────────────────────────────────────────
// 1. Component names start with Capital letter
// 2. Return ONE root element (wrap in <> </> if needed)
// 3. Use className not class
// 4. Props flow DOWN (parent → child), never up
// 5. Props are read-only inside the child
// 6. Use { } to embed any JS expression inside JSX
