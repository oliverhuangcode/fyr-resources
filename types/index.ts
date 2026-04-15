export interface Resource {
  title: string
  url: string
  type: 'video' | 'reading' | 'interactive'
}

export interface Lesson {
  id: string
  trackId: string
  stage: number
  title: string
  duration: string
  description: string
  skills: string[]
  resources: Resource[]
  checkpoint: string
}

export interface Track {
  id: string
  title: string
  description: string
  icon: string          // emoji or short string
  lessons: string[]     // ordered lesson IDs
  tickets: string[]     // ticket IDs
}

export interface Ticket {
  id: string
  trackId: string
  title: string
  context: string
  requirements: string[]
  stretchGoals: string[]
  definitionOfDone: string
  difficulty: 'starter' | 'intermediate' | 'advanced'
}
