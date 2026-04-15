import type { Ticket } from '@/types'

export const tickets: Ticket[] = [
  {
    id: 'backend-ticket-01',
    trackId: 'backend',
    title: 'Build a To-Do REST API',
    context:
      'You have worked through all 5 backend lessons. Now it is time to build something real. Create a to-do REST API with full CRUD support using Express and in-memory storage. This is your first complete backend project.',
    requirements: [
      'GET /todos — return all to-do items',
      'POST /todos — create a new to-do (body: { title: string })',
      'PUT /todos/:id — update a to-do title or completion status',
      'DELETE /todos/:id — delete a to-do by ID',
      'Each to-do has: id (auto-generated), title (string), completed (boolean, default false)',
      'Return 404 with a message when a to-do ID is not found',
    ],
    stretchGoals: [
      'Add GET /todos/:id to fetch a single to-do',
      'Add input validation: reject POST requests with an empty or missing title',
      'Persist to-dos to a JSON file so data survives server restarts',
      'Add a PATCH /todos/:id/complete endpoint to toggle completion',
    ],
    definitionOfDone:
      'All four routes work correctly when tested with Postman or curl. Edge cases (missing ID, empty body) return appropriate status codes and error messages.',
    difficulty: 'starter',
  },
]
