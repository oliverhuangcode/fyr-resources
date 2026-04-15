import type { Lesson } from '@/types'

export const lessons: Lesson[] = [
  {
    id: 'backend-01',
    trackId: 'backend',
    stage: 1,
    title: 'Introduction to Node.js',
    description:
      'Understand what Node.js is, how it differs from browser JavaScript, and how it handles many tasks at once without getting stuck.',
    skills: [
      'What Node.js is and why it exists',
      'The event loop and non-blocking I/O',
      'Running JavaScript outside the browser',
      'npm and the Node module system',
    ],
    content: [
      {
        type: 'text',
        heading: 'What is Node.js?',
        body: `Node.js is a JavaScript runtime — it lets you run JavaScript outside of a browser. That's basically it. If you already know JavaScript from the browser, you already know most of what you need to write a backend with Node.\n\nFor years, JavaScript was trapped in browsers. Node.js changed that by taking Chrome's V8 JavaScript engine and making it available as a standalone program. You run it in your terminal, on a server, or anywhere else you'd run code.`,
      },
      {
        type: 'code',
        heading: 'Your first Node.js script',
        language: 'javascript',
        body: `// hello.js
console.log('Hello from Node.js!')

// Run it in your terminal:
// node hello.js`,
      },
      {
        type: 'text',
        heading: 'The event loop — how Node stays fast',
        body: `This is the idea that trips most people up at first, so let's be concrete about it.\n\nNode.js is single-threaded — it only does one thing at a time. So how does it handle hundreds of requests simultaneously without grinding to a halt?\n\nThe answer is non-blocking I/O. Instead of waiting for slow operations (reading a file, hitting a database, making a network call), Node fires off the work and moves on. When the work is done, a callback runs with the result.\n\nThink of it like a waiter at a restaurant. A good waiter doesn't stand at the kitchen window waiting for your food. They take your order, hand it to the kitchen, and go take another table's order. When your food is ready, they bring it out. That's exactly what Node's event loop does.`,
      },
      {
        type: 'code',
        heading: 'Non-blocking in action',
        language: 'javascript',
        body: `// reading-a-file.js
const fs = require('fs')

console.log('1. Starting file read...')

fs.readFile('data.txt', 'utf8', (err, data) => {
  // This callback runs when the file is ready — not right now
  console.log('3. File contents:', data)
})

console.log('2. This runs before the file is ready')

// Output:
// 1. Starting file read...
// 2. This runs before the file is ready
// 3. File contents: (whatever's in data.txt)`,
      },
      {
        type: 'text',
        heading: 'npm and modules',
        body: `npm (Node Package Manager) is how you install and manage third-party code in Node projects. When you run \`npm install express\`, npm downloads the Express library and puts it in a \`node_modules\` folder.\n\nModules are how Node splits code across files. You export things from one file and import them in another:\n\n- CommonJS style (older): \`require()\` and \`module.exports\`\n- ES Module style (modern): \`import\` and \`export\`\n\nYou'll see both in the wild. For this track, we'll mostly use CommonJS since it's what most Node tutorials use.`,
      },
      {
        type: 'note',
        heading: 'Node is not a framework',
        body: `Node.js is a runtime — a platform for running JavaScript. Express, Fastify, and NestJS are frameworks built on top of it. When someone says "I'm building a backend in Node", they usually mean "I'm using Node with Express". You'll meet Express in Stage 3.`,
      },
    ],
    resources: [
      {
        title: 'Node.js Official Introduction',
        url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
        type: 'reading',
      },
      {
        title: 'Node.js Tutorial for Beginners — Mosh',
        url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        type: 'video',
      },
      {
        title: 'Node.js Playground (RunKit)',
        url: 'https://runkit.com/home',
        type: 'interactive',
      },
    ],
    selfCheck: [
      {
        question: 'How would you explain Node.js to a friend who only knows browser JavaScript? What\'s the one thing that\'s different?',
        answer: 'Node.js lets you run JavaScript outside the browser — on a server, in a terminal, anywhere. The one real difference is environment: in the browser you have window, document, and the DOM. In Node you have process, fs, and http. Same language, different set of built-in tools.',
      },
      {
        question: 'Think about the event loop. If Node is single-threaded, how does it handle two requests arriving at the same time without one blocking the other?',
        answer: 'Node fires off slow work (reading a file, querying a database) without waiting for it to finish, then moves on immediately. When the work is done, a callback runs with the result. Node isn\'t doing two things at once — it\'s efficiently juggling waiting tasks so nothing sits idle.',
      },
      {
        question: 'Open your terminal and run `node --version`. If it prints something like v18.x.x, you\'re set. If not, installing Node is your first task before Stage 3.',
        answer: 'This one you just have to check yourself. If Node isn\'t installed, go to nodejs.org and download the LTS version. Once installed, `node --version` should print something like `v20.11.0`.',
      },
    ],
  },

  {
    id: 'backend-02',
    trackId: 'backend',
    stage: 2,
    title: 'HTTP & REST Fundamentals',
    description:
      'Learn the building blocks of the web: how clients and servers communicate, what HTTP methods and status codes mean, and what REST actually is.',
    skills: [
      'The HTTP request/response cycle',
      'HTTP methods: GET, POST, PUT, PATCH, DELETE',
      'Status codes and what they communicate',
      'REST as a set of conventions, not a standard',
    ],
    content: [
      {
        type: 'text',
        heading: 'The language of the web',
        body: `Every time you open a website, call an API, or fetch data in your app — HTTP is the protocol doing the talking. It's a simple request/response system: a client (your browser, your app, your code) sends a request, and a server sends back a response.\n\nHTTP is text-based, which means you can actually read it. Here's what a real HTTP exchange looks like:`,
      },
      {
        type: 'code',
        heading: 'A raw HTTP request and response',
        language: 'http',
        body: `GET /users/42 HTTP/1.1
Host: api.example.com
Accept: application/json

---

HTTP/1.1 200 OK
Content-Type: application/json

{"id": 42, "name": "Alex", "email": "alex@example.com"}`,
      },
      {
        type: 'text',
        heading: 'HTTP methods — the verbs',
        body: `HTTP methods tell the server what kind of operation you want to do. You'll use these five constantly:\n\n**GET** — Fetch something. No body, no side effects. "Give me the list of users."\n\n**POST** — Create something. Send data in the body. "Here's a new user, please add it."\n\n**PUT** — Replace something entirely. The body contains the full updated version.\n\n**PATCH** — Update part of something. Only send the fields you're changing.\n\n**DELETE** — Remove something. Usually no body needed.\n\nA quick way to remember: GET is read-only. POST/PUT/PATCH/DELETE all change something.`,
      },
      {
        type: 'text',
        heading: 'Status codes — what the server says back',
        body: `Status codes are three-digit numbers that tell you what happened. The first digit tells you the category:\n\n**2xx — Success**\n- 200 OK — request succeeded\n- 201 Created — a new resource was created (usually after POST)\n- 204 No Content — success, but nothing to return (common after DELETE)\n\n**4xx — Client error** (you sent something wrong)\n- 400 Bad Request — malformed or missing data in the request\n- 401 Unauthorized — not logged in\n- 403 Forbidden — logged in but not allowed\n- 404 Not Found — the resource doesn't exist\n\n**5xx — Server error** (something broke on the server's side)\n- 500 Internal Server Error — the server crashed or threw an unhandled exception`,
      },
      {
        type: 'text',
        heading: 'What REST actually means',
        body: `REST (Representational State Transfer) is a set of conventions for designing APIs — not a strict standard. Most web APIs follow it loosely. The core ideas are:\n\n**Resources over actions** — URLs should name things (nouns), not operations (verbs). Use \`/users/42\` not \`/getUser?id=42\`. The HTTP method tells you the action.\n\n**Stateless** — each request contains everything the server needs to process it. The server doesn't remember anything between requests.\n\n**Consistent structure** — a collection is \`/users\`, a single item is \`/users/42\`. Sub-resources follow the same pattern: \`/users/42/posts\`.`,
      },
      {
        type: 'code',
        heading: 'REST URL patterns',
        language: 'http',
        body: `GET    /todos           → list all todos
POST   /todos           → create a new todo
GET    /todos/5         → get todo with id 5
PUT    /todos/5         → replace todo 5 entirely
PATCH  /todos/5         → update parts of todo 5
DELETE /todos/5         → delete todo 5`,
      },
      {
        type: 'note',
        heading: 'REST is a convention, not a law',
        body: `You'll find APIs in the wild that break REST conventions — verbs in URLs, POST used for everything, status codes that don't match what happened. That doesn't mean the API is broken. It just means whoever built it made different tradeoffs. Understanding REST lets you recognise those choices when you see them.`,
      },
    ],
    resources: [
      {
        title: 'HTTP — MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
        type: 'reading',
      },
      {
        title: 'REST API concepts and examples — WebConcepts',
        url: 'https://www.youtube.com/watch?v=7YcW25PHnAA',
        type: 'video',
      },
      {
        title: 'Hoppscotch — browser-based API tester',
        url: 'https://hoppscotch.io',
        type: 'interactive',
      },
    ],
    selfCheck: [
      {
        question: 'Walk through what happens when you type a URL into your browser and press Enter. What HTTP request is sent? What does a successful response look like?',
        answer: 'The browser sends a GET request to the server — something like `GET / HTTP/1.1`. If successful, the server responds with `200 OK` and sends back HTML. Your browser renders that HTML, then fires more GET requests for any images, stylesheets, and scripts referenced in it.',
      },
      {
        question: 'Why do you think REST uses nouns in URLs (/users, /posts) rather than verbs (/getUsers, /createPost)? What problem does that convention solve?',
        answer: 'The HTTP method already says the action — GET, POST, DELETE. Putting the action in the URL too means saying the same thing twice. Nouns keep URLs stable: /users always means "the users resource". The method tells you what to do with it. This makes APIs more predictable and consistent.',
      },
      {
        question: 'You\'re building an API. A user tries to delete a resource they don\'t have permission to delete. Which status code would you return — 401, 403, or 404?',
        answer: '403 Forbidden. The difference: 401 means "I don\'t know who you are — you\'re not logged in". 403 means "I know exactly who you are, and you\'re not allowed to do this". 404 is sometimes used deliberately to hide that a resource exists at all, but 403 is the honest answer here.',
      },
    ],
  },

  {
    id: 'backend-03',
    trackId: 'backend',
    stage: 3,
    title: 'Express Basics',
    description:
      'Set up an Express server, define routes, understand the req and res objects, and learn what middleware actually does.',
    skills: [
      'Installing and initialising Express',
      'Defining routes with GET, POST, DELETE',
      'Using req and res effectively',
      'Middleware in plain English',
    ],
    content: [
      {
        type: 'text',
        heading: 'Why Express?',
        body: `Node's built-in \`http\` module can technically build a server. But it's painful. You'd manually parse URLs, write if/else chains for routing, set headers by hand, and parse request bodies yourself. It gets messy fast.\n\nExpress wraps all of that with a clean, simple API. It's not magic — it's just a thin layer that handles the repetitive stuff so you can focus on your actual routes and logic.`,
      },
      {
        type: 'code',
        heading: 'The painful way vs the Express way',
        language: 'javascript',
        body: `// Raw Node.js — gets messy quickly
const http = require('http')
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/hello') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Hello World' }))
  } else {
    res.writeHead(404)
    res.end('Not found')
  }
})
server.listen(3000)

// With Express — clean and readable
const express = require('express')
const app = express()

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.listen(3000, () => console.log('Server running on port 3000'))`,
      },
      {
        type: 'text',
        heading: 'Routes',
        body: `A route is a combination of an HTTP method and a URL pattern. Express matches every incoming request against your routes and calls the handler for the first match.\n\nThe handler is a function that receives two arguments — \`req\` (the request) and \`res\` (the response). Your job is to do something with the request and send a response back.`,
      },
      {
        type: 'code',
        heading: 'GET, POST and DELETE routes',
        language: 'javascript',
        body: `const express = require('express')
const app = express()
app.use(express.json()) // parse JSON request bodies

let users = [
  { id: '1', name: 'Alex' },
  { id: '2', name: 'Jordan' },
]

// GET — fetch all users
app.get('/users', (req, res) => {
  res.json(users)
})

// GET — fetch one user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
})

// POST — create a new user
app.post('/users', (req, res) => {
  const newUser = { id: Date.now().toString(), name: req.body.name }
  users.push(newUser)
  res.status(201).json(newUser)
})

// DELETE — remove a user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== req.params.id)
  res.status(204).send()
})

app.listen(3000)`,
      },
      {
        type: 'text',
        heading: 'req and res',
        body: `**req** (request) is everything about the incoming request:\n- \`req.params\` — URL path parameters (e.g., \`req.params.id\` for \`/users/:id\`)\n- \`req.body\` — the parsed request body (only available after \`express.json()\` middleware)\n- \`req.query\` — query string parameters (e.g., \`?page=2&limit=10\`)\n- \`req.headers\` — request headers\n\n**res** (response) is how you send something back:\n- \`res.json(data)\` — send JSON (sets Content-Type automatically)\n- \`res.status(404).json({ error: 'Not found' })\` — set status code + send JSON\n- \`res.send('text')\` — send plain text\n- \`res.status(204).send()\` — send empty success response`,
      },
      {
        type: 'text',
        heading: 'Middleware',
        body: `Middleware is code that runs before your route handlers. Think of it as a pipeline:\n\n\`request → middleware 1 → middleware 2 → route handler → response\`\n\nEach middleware function receives \`req\`, \`res\`, and a \`next\` function. If it calls \`next()\`, the request moves to the next middleware or route. If it sends a response itself, the chain stops.\n\n\`express.json()\` is middleware that reads the raw request body and parses it as JSON, making it available as \`req.body\`. Without it, \`req.body\` is always \`undefined\`.`,
      },
      {
        type: 'code',
        heading: 'Writing your own middleware',
        language: 'javascript',
        body: `// A simple logger middleware
function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url}\`)
  next() // pass the request along to the next handler
}

app.use(logger) // runs before every route

// You can also apply middleware to specific routes only
app.get('/protected', authenticate, (req, res) => {
  res.json({ secret: 'data' })
})`,
      },
    ],
    resources: [
      {
        title: 'Express Getting Started',
        url: 'https://expressjs.com/en/starter/installing.html',
        type: 'reading',
      },
      {
        title: 'Express.js Crash Course — Traversy Media',
        url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
        type: 'video',
      },
      {
        title: 'Express Routing Guide',
        url: 'https://expressjs.com/en/guide/routing.html',
        type: 'reading',
      },
    ],
    selfCheck: [
      {
        question: 'In your own words, what does middleware do? Think of a real use case where you\'d want to run the same code before every single route handler.',
        answer: 'Middleware is code that runs before your route handler. A real use case: authentication. Instead of adding an auth check to every route, you write it once as middleware and attach it to all protected routes. Logging is another — one middleware that logs every request, not duplicated in every handler.',
      },
      {
        question: 'Looking at a route handler like `(req, res) => {...}` — what kind of data lives on `req.body`? What about `req.params`? When would you use each?',
        answer: '`req.body` is data the client sent in the request body — typically a JSON object from a POST or PATCH (e.g. `{ name: "Alex" }`). `req.params` is from the URL path — for `/users/:id`, `req.params.id` is whatever was in the URL (e.g. `"42"`). Use body for data being created or updated. Use params for identifying which resource you\'re working with.',
      },
      {
        question: 'Why do you think Express was built at all? What would be tedious about building a backend with only Node\'s built-in `http` module?',
        answer: 'With raw Node, you\'d write routing as one giant if/else chain matching `req.method` and `req.url`, manually parse URL parameters, set Content-Type headers on every response, and handle body parsing yourself. Express wraps all of that in a clean API so you can focus on what your routes actually do.',
      },
    ],
  },

  {
    id: 'backend-04',
    trackId: 'backend',
    stage: 4,
    title: 'Working with Data',
    description:
      'Store and retrieve data using in-memory JavaScript arrays, understand JSON as the web\'s data format, and learn CRUD without a database.',
    skills: [
      'In-memory storage with arrays',
      'JSON.stringify and JSON.parse',
      'Reading and writing request body data',
      'Basic CRUD without a database',
    ],
    content: [
      {
        type: 'text',
        heading: 'In-memory storage',
        body: `Before you learn databases, there's a simpler way to store data: a JavaScript array in your server's memory. It's fast, needs zero setup, and is perfect for learning.\n\nThe catch is obvious — the moment your server restarts, all that data is gone. That's not a bug for our purposes right now, it's just a limitation to understand. Real applications use databases. For learning, arrays are fine.`,
      },
      {
        type: 'code',
        heading: 'Full CRUD with an array',
        language: 'javascript',
        body: `const express = require('express')
const app = express()
app.use(express.json())

// Our "database" — just a variable in memory
let todos = [
  { id: 1, text: 'Learn Node.js', done: false },
  { id: 2, text: 'Build an API',  done: false },
]
let nextId = 3

// GET /todos — list everything
app.get('/todos', (req, res) => {
  res.json(todos)
})

// GET /todos/:id — get one
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id))
  if (!todo) return res.status(404).json({ error: 'Not found' })
  res.json(todo)
})

// POST /todos — create
app.post('/todos', (req, res) => {
  const { text } = req.body
  const todo = { id: nextId++, text, done: false }
  todos.push(todo)
  res.status(201).json(todo)
})

// PATCH /todos/:id — update
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id))
  if (!todo) return res.status(404).json({ error: 'Not found' })
  if (req.body.done !== undefined) todo.done = req.body.done
  if (req.body.text !== undefined) todo.text = req.body.text
  res.json(todo)
})

// DELETE /todos/:id — remove
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  todos = todos.filter(t => t.id !== id)
  res.status(204).send()
})

app.listen(3000)`,
      },
      {
        type: 'text',
        heading: 'JSON — the data format of the web',
        body: `JSON (JavaScript Object Notation) is how APIs talk to each other. It's a text format that looks almost identical to a JavaScript object literal — but it's not the same thing.\n\nJSON is always a string. To work with it in JavaScript, you convert back and forth:\n\n- \`JSON.stringify(obj)\` — turns a JS object into a JSON string (for sending)\n- \`JSON.parse(str)\` — turns a JSON string into a JS object (for using)\n\nExpress's \`express.json()\` middleware does the \`JSON.parse()\` call for you automatically when a request comes in with JSON in the body. That's why \`req.body\` is a real object you can use directly.`,
      },
      {
        type: 'code',
        heading: 'JSON in practice',
        language: 'javascript',
        body: `const todo = { id: 1, text: 'Learn Node', done: false }

// Turn an object into a JSON string
const jsonString = JSON.stringify(todo)
// '{"id":1,"text":"Learn Node","done":false}'

// Turn a JSON string back into an object
const parsed = JSON.parse(jsonString)
// { id: 1, text: 'Learn Node', done: false }

// With express.json() middleware, req.body is already parsed:
app.post('/todos', (req, res) => {
  console.log(typeof req.body)      // 'object' — not a string
  console.log(req.body.text)        // 'Buy milk' — you can use it directly
})`,
      },
      {
        type: 'note',
        heading: 'The limitation you\'ll hit',
        body: `In-memory arrays are great for building and learning. But if your server restarts — which happens every time you change your code in development — all your data is gone. That's why real applications use databases like PostgreSQL, MongoDB, or SQLite. You'll get there. For now, understanding this limitation is the whole point.`,
      },
    ],
    resources: [
      {
        title: 'Working with JSON — MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON',
        type: 'reading',
      },
      {
        title: 'Node.js & Express CRUD API — Net Ninja',
        url: 'https://www.youtube.com/watch?v=vjf774RKrLc',
        type: 'video',
      },
    ],
    selfCheck: [
      {
        question: 'Walk through what happens to your in-memory todos array when your server restarts. Where does the data go? Why does Node not save it automatically?',
        answer: 'It\'s gone. When the Node process exits, all variables in memory are released — there\'s no automatic saving. The next start initialises the array fresh from code. This is why databases exist: they write to disk, which survives restarts.',
      },
      {
        question: 'What does `JSON.parse()` do that\'s different from just using the raw string? Why can\'t you access `req.body.text` without `express.json()` middleware?',
        answer: 'A raw request body arrives as a string. `JSON.parse()` converts it into a real JavaScript object you can dot-access. Without `express.json()`, Express never reads or parses the body, so `req.body` is `undefined`. The middleware reads the raw stream, parses it, and attaches the object to `req.body`.',
      },
      {
        question: 'If you wanted your todo app to remember items between server restarts, what would you reach for?',
        answer: 'Options: (1) A database like PostgreSQL or SQLite — stores data on disk. (2) A JSON file — read on startup, write on every change. (3) A key-value store like Redis. For a simple todo app, even a local JSON file works. The key insight: anything that writes to disk survives a restart.',
      },
    ],
  },

  {
    id: 'backend-05',
    trackId: 'backend',
    stage: 5,
    title: 'Testing and Debugging Your API',
    description:
      'Learn how to test your API with Hoppscotch, read terminal errors without panicking, and debug with console.log like a pro.',
    skills: [
      'Using Hoppscotch to send real HTTP requests',
      'Reading and understanding Node.js error messages',
      'Debugging with console.log strategically',
      'Common errors and how to fix them',
    ],
    content: [
      {
        type: 'text',
        heading: 'Why testing your API matters',
        body: `You can't open a REST API in a browser the same way you open a website. A browser only makes GET requests. To test POST, PATCH, and DELETE routes — or to send a JSON body — you need a tool.\n\nHoppscotch is a free, browser-based API tester. No install needed, no account required. You'll use it throughout this track and the ticket that follows.`,
      },
      {
        type: 'text',
        heading: 'Testing with Hoppscotch',
        body: `Open hoppscotch.io, start your Express server locally, and you can immediately send requests to \`http://localhost:3000\`.\n\nFor each route you want to test:\n1. Select the HTTP method (GET, POST, etc.) from the dropdown\n2. Enter the URL (e.g., \`http://localhost:3000/todos\`)\n3. For POST/PATCH, go to the Body tab → select JSON → paste your JSON\n4. Click Send and inspect the response\n\nYou'll see the status code, response time, and full response body. If something is wrong, that's your first clue.`,
      },
      {
        type: 'text',
        heading: 'Reading terminal errors without panicking',
        body: `When Node crashes, it prints a stack trace. It looks scary but follows a pattern. Read it from top to bottom:\n\n**Line 1** usually tells you the error type and message — this is the most useful part.\n**The stack** below it shows the call chain. Look for the first file that belongs to you (not node_modules). That's where the problem is.`,
      },
      {
        type: 'code',
        heading: 'A typical Node.js error',
        language: 'text',
        body: `TypeError: Cannot read properties of undefined (reading 'text')
    at /Users/you/project/server.js:14:28    ← your file, line 14
    at Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)
    at next (express/lib/router/route.js:144:13)
    ...

→ Go to server.js line 14. Something is undefined that you expected to have a value.
  Most likely: req.body is undefined because express.json() middleware is missing.`,
      },
      {
        type: 'text',
        heading: 'Debugging with console.log',
        body: `\`console.log\` is not a last resort. It's a first-class debugging tool. The key is logging the right things at the right points.\n\nWhen a route isn't behaving as expected:\n1. Log \`req.body\` at the top of the handler — is the data arriving correctly?\n2. Log your data store (the array) before and after mutations — is it changing?\n3. Log the value of any variable you're unsure about right before you use it\n\nIf a route isn't being hit at all — add a log at the very top of the handler. If it doesn't print, Express isn't matching the route.`,
      },
      {
        type: 'code',
        heading: 'Strategic console.log debugging',
        language: 'javascript',
        body: `app.post('/todos', (req, res) => {
  console.log('POST /todos hit')          // 1. Is the route being reached?
  console.log('req.body:', req.body)       // 2. Did the body arrive correctly?

  const { text } = req.body

  if (!text) {
    console.log('text is missing — returning 400')
    return res.status(400).json({ error: 'text is required' })
  }

  const todo = { id: nextId++, text, done: false }
  console.log('Created todo:', todo)       // 3. Does it look right?

  todos.push(todo)
  console.log('todos array:', todos)       // 4. Was it added?

  res.status(201).json(todo)
})`,
      },
      {
        type: 'text',
        heading: 'Common errors and fixes',
        body: `**\`req.body\` is undefined**\nYou forgot \`app.use(express.json())\`. Add it before your routes.\n\n**404 on a route you definitely added**\nCheck the HTTP method. If you defined \`app.get\` but sent a POST, you'll get a 404. Also check for typos in the URL path.\n\n**\`Cannot set headers after they are sent\`**\nYou're calling \`res.json()\` or \`res.send()\` twice in the same handler. Add a \`return\` before the first one.\n\n**Port already in use (EADDRINUSE)**\nAnother process is already running on that port — probably a previous instance of your server that didn't shut down. Kill it with Ctrl+C in the original terminal, or change the port number.`,
      },
      {
        type: 'note',
        heading: 'The ticket that follows this stage',
        body: `The ticket attached to this track asks you to build a to-do REST API from scratch. Use this lesson and the previous ones as your reference — but try to build it from memory first, and only look back when you're stuck. That's the point of the ticket: proving the skills to yourself.`,
      },
    ],
    resources: [
      {
        title: 'Hoppscotch — browser-based API tester',
        url: 'https://hoppscotch.io',
        type: 'interactive',
      },
      {
        title: 'Build a REST API with Node and Express — freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
        type: 'video',
      },
      {
        title: 'REST API Best Practices — Stack Overflow Blog',
        url: 'https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/',
        type: 'reading',
      },
    ],
    selfCheck: [
      {
        question: 'Walk through the full lifecycle of a `POST /todos` request: from the moment it arrives at your server to the moment the response is sent.',
        answer: '(1) Request arrives at Node\'s HTTP server. (2) Express matches it to `app.post(\'/todos\', ...)`. (3) `express.json()` middleware runs — parses the JSON body into `req.body`. (4) Your handler reads `req.body.text`, creates a todo, pushes it to the array. (5) `res.status(201).json(todo)` sends the response — status 201, Content-Type: application/json, body is the new todo as JSON.',
      },
      {
        question: 'What\'s the difference between a 400 and a 404 error? Write down a real scenario where you\'d return each one.',
        answer: '400 Bad Request — the client sent something wrong or incomplete. Example: POST /todos with no `text` field in the body. 404 Not Found — the request is valid but the resource doesn\'t exist. Example: DELETE /todos/999 where no todo with id 999 exists.',
      },
      {
        question: 'How would you explain REST to someone who\'s never heard the term? Try it in two or three sentences.',
        answer: 'REST is a set of conventions for building web APIs. You organise your API around resources — nouns like /users or /todos — and use HTTP methods to express what to do with them: GET to read, POST to create, DELETE to remove. Use status codes to communicate what happened. That\'s essentially it.',
      },
    ],
  },
]
