import type { Track } from '@/types'

export const tracks: Track[] = [
  {
    id: 'fullstack',
    title: 'Fullstack Development',
    description: 'Learn React for the frontend and Node.js for the backend, then wire them together into a complete fullstack application.',
    icon: '🔗',
    lessons: ['fullstack-01', 'fullstack-02', 'fullstack-03', 'fullstack-04', 'fullstack-05'],
    tickets: ['fullstack-ticket-01', 'fullstack-ticket-02'],
    courseResources: [
      {
        title: 'React Official Docs — react.dev',
        url: 'https://react.dev',
        description: 'The new official React docs. Redesigned from scratch with interactive examples. The Quick Start and tutorial are the best entry points — do these before anything else.',
      },
      {
        title: 'Full Stack Open — University of Helsinki',
        url: 'https://fullstackopen.com/en/',
        description: 'Free university-level course covering React, Node, Express, REST APIs, and MongoDB. Parts 1–5 are directly relevant to this track. Widely considered the best free fullstack resource online.',
      },
      {
        title: 'The Odin Project — Full Stack JavaScript',
        url: 'https://www.theodinproject.com/paths/full-stack-javascript',
        description: 'Project-based curriculum covering React, Node, and the full JavaScript stack. Heavy on building real things — less tutorial, more doing.',
      },
      {
        title: 'Scrimba — Learn React',
        url: 'https://scrimba.com/learn/learnreact',
        description: 'Free interactive React course with embedded code editors in the browser. No setup needed. Good for learning JSX and hooks with instant feedback.',
      },
      {
        title: 'JavaScript.info',
        url: 'https://javascript.info/',
        description: "The best free reference for modern JavaScript. If React's async patterns or array methods trip you up, this is where to go first. Covers the language thoroughly.",
      },
      {
        title: 'JSONPlaceholder — Free Fake API',
        url: 'https://jsonplaceholder.typicode.com/',
        description: 'A free public REST API with fake data. Perfect for practising fetch calls and useEffect without setting up your own backend. Use it while working through Lessons 4 and 5.',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Learn Node.js, HTTP, Express, and build your first REST API from scratch.',
    icon: '⚙️',
    lessons: ['backend-01', 'backend-02', 'backend-03', 'backend-04', 'backend-05'],
    tickets: ['backend-ticket-01', 'backend-ticket-02'],
    courseResources: [
      {
        title: 'The Odin Project — NodeJS',
        url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs',
        description: 'Free, project-based Node.js curriculum. Goes deep on Express, databases, authentication, and deployment. The gold standard for self-taught backend developers.',
      },
      {
        title: 'Full Stack Open — University of Helsinki',
        url: 'https://fullstackopen.com/en/',
        description: 'Free university-level course covering Node, Express, REST APIs, MongoDB, testing, and React. One of the most comprehensive free courses available.',
      },
      {
        title: 'CS50x — Harvard',
        url: 'https://cs50.harvard.edu/x/',
        description: "Harvard's introduction to computer science. Covers programming fundamentals, algorithms, databases, and web development. Demanding but genuinely rewarding.",
      },
      {
        title: 'freeCodeCamp — Back End Development and APIs',
        url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
        description: 'Free, hands-on certification covering Node, Express, MongoDB, and REST APIs. Build five real projects to earn the certificate.',
      },
      {
        title: 'JavaScript.info',
        url: 'https://javascript.info/',
        description: 'The best free reference for modern JavaScript. Covers the language thoroughly from basics to advanced — useful at every stage of this track.',
      },
      {
        title: 'NodeSchool',
        url: 'https://nodeschool.io/',
        description: 'Interactive command-line workshops that run in your terminal. learnyounode is the classic starting point for learning Node hands-on.',
      },
    ],
  },
]
