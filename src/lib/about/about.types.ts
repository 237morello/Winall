export interface Stat {
  value: string
  label: string
  detail?: string
  accent?: boolean
}

export interface TimelineItem {
  year: string
  title: string
  description: string
  isCurrent?: boolean
}

export interface ExpertiseArea {
  title: string
  description: string
  proof: string
}

export interface TrustLabel {
  value: string
  label: string
}

export interface Partner {
  name: string
  category: string
}

export interface TeamMember {
  initials: string
  name: string
  role: string
  tag: string
  focus: string
  accent?: boolean
}

export interface FaqItem {
  question: string
  answer: string
  preview: string
}

export interface MvvData {
  mission: string
  vision: string
  values: string[]
}
