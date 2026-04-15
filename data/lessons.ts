import type { Lesson } from '@/types'

export const lessons: Lesson[] = [
  {
    id: 'backend-01',
    trackId: 'backend',
    stage: 1,
    title: 'Introduction to Node.js',
    duration: '45 min',
    description:
      'Understand what Node.js is, how it differs from browser JavaScript, and why it powers most modern backends.',
    skills: [
      'What Node.js is and how it works',
      'The event loop and non-blocking I/O',
      'Running JavaScript outside the browser',
      'npm and the Node module system',
    ],
    resources: [
      {
        title: 'Node.js Official Introduction',
        url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
        type: 'reading',
      },
      {
        title: 'Node.js Tutorial for Beginners',
        url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        type: 'video',
      },
      {
        title: 'Node.js Playground',
        url: 'https://runkit.com/home',
        type: 'interactive',
      },
    ],
    checkpoint:
      'Explain in your own words: what is the event loop and why does Node.js use it?',
  },
  {
    id: 'backend-02',
    trackId: 'backend',
    stage: 2,
    title: 'HTTP & REST Fundamentals',
    duration: '40 min',
    description:
      'Learn the building blocks of the web: HTTP methods, status codes, headers, and how REST structures APIs.',
    skills: [
      'HTTP request/response cycle',
      'HTTP methods: GET, POST, PUT, DELETE',
      'Status codes (2xx, 4xx, 5xx)',
      'REST principles and resource naming',
    ],
    resources: [
      {
        title: 'HTTP — MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
        type: 'reading',
      },
      {
        title: 'REST API concepts and examples',
        url: 'https://www.youtube.com/watch?v=7YcW25PHnAA',
        type: 'video',
      },
      {
        title: 'Postman Learning Centre',
        url: 'https://learning.postman.com/docs/getting-started/introduction/',
        type: 'interactive',
      },
    ],
    checkpoint:
      'What is the difference between PUT and PATCH? When would you use each?',
  },
  {
    id: 'backend-03',
    trackId: 'backend',
    stage: 3,
    title: 'Express Basics',
    duration: '50 min',
    description:
      'Set up an Express server, define routes, and handle requests and responses.',
    skills: [
      'Installing and initialising Express',
      'Defining GET and POST routes',
      'req and res objects',
      'Middleware basics (express.json)',
    ],
    resources: [
      {
        title: 'Express Getting Started',
        url: 'https://expressjs.com/en/starter/installing.html',
        type: 'reading',
      },
      {
        title: 'Express.js Crash Course',
        url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
        type: 'video',
      },
      {
        title: 'Express.js Docs — Routing',
        url: 'https://expressjs.com/en/guide/routing.html',
        type: 'reading',
      },
    ],
    checkpoint:
      'Write (on paper or in a file) the Express code to handle a GET /hello request that returns { message: "Hello World" }.',
  },
  {
    id: 'backend-04',
    trackId: 'backend',
    stage: 4,
    title: 'Working with Data',
    duration: '45 min',
    description:
      'Store and retrieve data using in-memory JavaScript arrays. Understand JSON as the data exchange format.',
    skills: [
      'In-memory data storage with arrays',
      'JSON.stringify and JSON.parse',
      'Reading and writing request body data',
      'Basic CRUD operations without a database',
    ],
    resources: [
      {
        title: 'Working with JSON — MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON',
        type: 'reading',
      },
      {
        title: 'Node.js & Express — CRUD',
        url: 'https://www.youtube.com/watch?v=vjf774RKrLc',
        type: 'video',
      },
    ],
    checkpoint:
      'If your server restarts, what happens to data stored in a JavaScript array? What would you need to solve this permanently?',
  },
  {
    id: 'backend-05',
    trackId: 'backend',
    stage: 5,
    title: 'Building Your First REST API',
    duration: '60 min',
    description:
      'Bring it all together: build a complete to-do REST API with all four CRUD operations.',
    skills: [
      'Structuring a REST API project',
      'Implementing GET, POST, PUT, DELETE endpoints',
      'Handling edge cases (404, missing body fields)',
      'Testing with curl or Postman',
    ],
    resources: [
      {
        title: 'Build a REST API with Node and Express',
        url: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
        type: 'video',
      },
      {
        title: 'REST API Best Practices',
        url: 'https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/',
        type: 'reading',
      },
      {
        title: 'Postman — Testing APIs',
        url: 'https://learning.postman.com/docs/sending-requests/requests/',
        type: 'interactive',
      },
    ],
    checkpoint:
      'Your API needs to return the created resource after a POST. What HTTP status code should you return, and why 201 instead of 200?',
  },
]
