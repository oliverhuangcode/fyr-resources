export interface Resource {
  title: string
  url: string
  type: 'video' | 'reading' | 'interactive'
}

export interface LessonSection {
  type: 'text' | 'code' | 'note'
  heading?: string
  body: string
  language?: string
}

export interface SelfCheckPrompt {
  question: string
  answer: string
}

export interface CourseResource {
  title: string
  url: string
  description: string
}

export interface Lesson {
  id: string
  trackId: string
  stage: number
  title: string
  description: string
  skills: string[]
  content: LessonSection[]
  resources: Resource[]
  selfCheck: SelfCheckPrompt[]
}

export interface Track {
  id: string
  title: string
  description: string
  icon: string
  lessons: string[]
  tickets: string[]
  courseResources: CourseResource[]
}

export interface ProjectTask {
  title: string
  description: string
  checkpoint: string
}

export interface Ticket {
  id: string
  trackId: string
  type?: 'ticket' | 'project'
  title: string
  context: string
  concepts?: string[]
  tasks?: ProjectTask[]
  requirements: string[]
  stretchGoals: string[]
  definitionOfDone: string
  difficulty: 'starter' | 'intermediate' | 'advanced'
}
