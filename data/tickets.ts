import type { Ticket } from '@/types'

export const tickets: Ticket[] = [
  // ─── Fullstack track ────────────────────────────────────────────────────
  {
    id: 'fullstack-ticket-01',
    trackId: 'fullstack',
    title: 'Build a React Task List',
    context:
      'You have worked through the first three lessons — components, props, and state. Before connecting any backend, prove the frontend fundamentals. Build a task list entirely in React state: add tasks, mark them done, and remove them.',
    requirements: [
      'Display a list of tasks',
      'Add new tasks via a text input and a submit button',
      'Mark a task as complete by clicking it — show a visible difference (strikethrough, dimmed text, or a checkmark)',
      'Delete a task via a button on each task',
      'An empty input must not add a task',
      'Task data lives in React state — not a global variable, not the DOM',
    ],
    stretchGoals: [
      'Filter tasks by status: All / Active / Completed',
      'Show a count of incomplete tasks',
      'Persist tasks to localStorage so they survive a page refresh',
      'Add keyboard support: pressing Enter in the input submits the form',
    ],
    definitionOfDone:
      'All four interactions (add, complete, delete, empty-input guard) work in the browser. The list updates immediately on every action. No console errors.',
    difficulty: 'starter',
  },
  {
    id: 'fullstack-ticket-02',
    trackId: 'fullstack',
    title: 'Fullstack Notes App',
    context:
      'You have worked through all five fullstack lessons. Now connect the two halves: build a React frontend that talks to an Express backend over real HTTP. No database — use in-memory storage on the backend. The goal is to experience the complete fullstack loop: render, fetch, mutate, re-render.',
    requirements: [
      'Express API with three endpoints: GET /api/notes (list all), POST /api/notes (create), DELETE /api/notes/:id (remove)',
      'CORS configured so the React frontend can reach the Express server',
      'React frontend that fetches and displays all notes when it first loads',
      'A form to add a new note — at minimum a title field',
      'A delete button on each note that removes it via the API and updates the UI',
      'A loading state shown while the initial fetch is in progress',
    ],
    stretchGoals: [
      'Add PUT /api/notes/:id and implement inline editing in the frontend',
      'Show an error message in the UI when an API request fails',
      'Persist notes to a JSON file on the server so they survive restarts',
      'Add an environment variable for the API base URL in the React app',
    ],
    definitionOfDone:
      'You can add, view, and delete notes. Every action makes a real HTTP request to your Express backend — verified in the Network tab of DevTools. Refreshing the page shows the current server state.',
    difficulty: 'intermediate',
  },

  // ─── Backend track ───────────────────────────────────────────────────────
  {
    id: 'backend-ticket-02',
    trackId: 'backend',
    type: 'project',
    title: 'Notion → Google Calendar Sync',
    context:
      'You have built a local CRUD API. Now build something that runs in the real world. This guided project gives you a working Node.js app that syncs events from a Notion database to Google Calendar on a 30-minute schedule — Notion is the source of truth and changes flow through automatically. Most of the app is pre-built. You implement three files that do the core data work: fetching from Notion, mapping the fields, and writing to Google Calendar. Ask your lead for the repo link and credentials to get started.',
    concepts: [
      'async/await — writing non-blocking code that reads like synchronous code',
      'SDK clients — calling external APIs through a library instead of raw HTTP',
      'OAuth2 — how apps get permission to act on a user\'s behalf (pre-built, but explained)',
      'File-based persistence — storing sync state in a JSON file instead of in memory',
      'Cron scheduling — running code on a repeating timer (every 30 minutes)',
    ],
    tasks: [
      {
        title: 'Task 1 — Fetch events from Notion',
        description:
          'The fetch loop and pagination are pre-built. You add a cutoff date (January 1st of the current year) and a Notion filter that returns pages where Type is "Event" or "Social" and Timeline is on or after that cutoff. File: sync/fetchNotion.js',
        checkpoint: 'node index.js logs "Fetched X pages from Notion" with no errors.',
      },
      {
        title: 'Task 2 — Map Notion fields to Google Calendar format',
        description:
          'Extract the event title, date, venue, caption, and registration link from the Notion page properties and build a Google Calendar event object. Return null if there is no date so the event is skipped gracefully. File: sync/mapFields.js',
        checkpoint:
          'node index.js logs event names — you will see "Failed to create" errors until Task 3 is done.',
      },
      {
        title: 'Task 3 — Write to Google Calendar',
        description:
          'Implement three Google Calendar API wrappers: createEvent, updateEvent, and deleteEvent. Each wraps one SDK call. The sync orchestration is pre-built — you just provide the three operations. File: sync/googleCalendar.js',
        checkpoint:
          'A full sync run completes and logs Created / Updated / Deleted / Skipped counts.',
      },
    ],
    requirements: [],
    stretchGoals: [
      'Handle Notion date ranges (start + end date) so multi-day events span the correct days in Google Calendar',
    ],
    definitionOfDone:
      'A full sync run completes without errors. New Notion events appear in Google Calendar. Editing a Notion event updates the calendar entry. Archiving a Notion event removes it from the calendar.',
    difficulty: 'intermediate',
  },
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
