import type { Track } from '@/types'

export const tracks: Track[] = [
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
