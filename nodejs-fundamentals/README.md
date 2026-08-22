Node.js Fundamentals

Fellow: Nenavath Sunitha Program: Dev Weekends Fellowship 2026 Task: Node.js Fundamentals (Worth 10 points)

Project Structure
nodejs-fundamentals/
├── package.json
├── data/
│   └── sample.txt
└── src/
    ├── server.js       ← HTTP server (no Express)
    ├── fs-demo.js      ← File system operations
    └── events-demo.js  ← Event loop + EventEmitter
How to Run
bash
npm start              # Start HTTP server on port 3000
npm run fs-demo        # Run file system demo
npm run events-demo    # Run event loop demo
1. The Node.js Event Loop

Node.js is single-threaded but handles thousands of concurrent requests through the event loop — it never blocks on I/O operations.

   ┌─────────────────────────────┐
   │        Call Stack           │  ← Sync code runs here first
   └──────────────┬──────────────┘
                  │
   ┌──────────────▼──────────────┐
   │   Microtask Queue           │  ← process.nextTick, Promise.then
   └──────────────┬──────────────┘
                  │
   ┌──────────────▼──────────────┐
   │   Macrotask Queue           │  ← setTimeout, setInterval, I/O callbacks
   └─────────────────────────────┘

Execution order:

js
console.log("1. Sync start");
setTimeout(() => console.log("4. setTimeout"), 0);
Promise.resolve().then(() => console.log("3. Promise"));
process.nextTick(() => console.log("2. nextTick"));
console.log("1. Sync end");
// Output: Sync start → Sync end → nextTick → Promise → setTimeout

Why this matters: When Node calls fs.readFile(), it hands the work to the OS and registers a callback. The event loop is free to handle other requests. When the file is ready, the OS notifies Node and the callback enters the queue. This is why Node can handle many concurrent requests on a single thread.

2. HTTP Server (no Express)
js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello from Node.js!</h1>");
    return;
  }
  res.writeHead(404);
  res.end("Not found");
});

server.listen(3000, () => console.log("Running on port 3000"));
Routes implemented
Method	Route	Response
GET	/	HTML home page
GET	/about	HTML about page
GET	/api/users	JSON array of users
GET	/api/time	Current server time
GET	/files	Contents of sample.txt via fs
POST	/api/echo	Echoes request body as JSON
Any	/*	404 JSON response
3. CommonJS Modules

Node.js uses CommonJS (CJS) by default — require() and module.exports.

js
// math.js — exporting
function add(a, b) { return a + b; }
module.exports = { add };

// app.js — importing
const { add } = require("./math");
console.log(add(2, 3)); // 5

CJS vs ES Modules:

	CommonJS	ES Modules
Import	require()	import
Export	module.exports	export
Loading	Synchronous	Asynchronous
Node default	✅ Yes	Needs .mjs or "type":"module"
4. File System Module (fs)
js
const fs = require("fs");

// Async (non-blocking) — always use in servers
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Write file
fs.writeFile("output.txt", "content", (err) => {
  if (err) throw err;
});

// Append to file
fs.appendFile("log.txt", "new line\n", (err) => { });

// Streams — for large files (memory efficient)
const readable = fs.createReadStream("big.txt");
const writable = fs.createWriteStream("copy.txt");
readable.pipe(writable); // pipe readable into writable

Rule: Never use fs.readFileSync inside an HTTP server — it blocks the entire event loop and all other requests must wait.

5. npm and package.json Scripts
json
{
  "scripts": {
    "start":       "node src/server.js",
    "dev":         "node --watch src/server.js",
    "fs-demo":     "node src/fs-demo.js",
    "events-demo": "node src/events-demo.js"
  }
}

Common npm commands:

Command	What it does
npm init -y	Create package.json with defaults
npm install <pkg>	Install a package (adds to node_modules)
npm install -D <pkg>	Install as dev dependency
npm run <script>	Run a script from package.json
npm start	Shortcut for npm run start
npm list	Show installed packages
6. EventEmitter
js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("data", (chunk) => console.log("Got:", chunk));  // subscribe
emitter.once("connect", () => console.log("Connected!"));   // fires once only
emitter.emit("data", "hello");  // fire event
emitter.off("data", handler);   // unsubscribe

Every Node.js core class (http.Server, fs streams, net.Socket) extends EventEmitter internally.

Key Takeaways
Node.js is single-threaded — the event loop handles concurrency through async callbacks, not threads.
Always use async fs methods in servers — sync methods block the event loop.
CommonJS (require) is Node's default module system — different from browser ES Modules (import).
package.json scripts are shortcuts — npm start is cleaner than typing the full node command.
Streams handle large files efficiently — they process data in chunks instead of loading everything into memory.
