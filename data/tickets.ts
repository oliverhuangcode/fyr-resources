import type { Ticket } from '@/types'

export const tickets: Ticket[] = [
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
