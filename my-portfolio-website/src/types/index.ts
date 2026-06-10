export interface ImageRef {
  _type: 'image'
  asset: {
    _ref: string
  }
}

export interface Project {
  _id: string
  title: string
  description: string
  link?: string
  Gitlink?: string
  controls?: string[]
  type?: string
  image?: ImageRef
  slug?: {
    current: string
  }
}

export interface ProjectPage {
  _id: string
  title?: string
  project?: {
    _id: string
  }
  description?: string
  gameplayImages?: ImageRef[]
  features?: string[]
  tech?: string[]
  learned?: string[]
  future?: string
}

export interface Game {
  _id: string
  title: string
  description: string
  Gamelink?: string
  Gitlink?: string
  controls?: string[]
  type?: string
  image?: ImageRef
  slug?: {
    current: string
  }
}

export interface GamePage {
  _id: string
  title?: string
  game?: {
    _id: string
  }
  description?: string
  gameplayImages?: ImageRef[]
  features?: string[]
  tech?: string[]
  learned?: string[]
  future?: string
  heroLayout?: 'centered' | 'split' | 'banner'
  playButtonText?: string
  sectionLabels?: {
    overview?: string
    gameplay?: string
    features?: string
    tech?: string
    learned?: string
    future?: string
  }
  pageLayout?: {
    preset?: 'classic' | 'arcade' | 'showcase' | 'compact'
    overviewLayout?: 'card' | 'split' | 'callout'
    contentLayout?: 'stacked' | 'two-column' | 'alternating'
    sectionStyle?: 'filled' | 'outlined' | 'minimal'
    gameplayLayout?: 'grid' | 'featured' | 'strip'
    imageShape?: 'rounded' | 'square' | 'shadow'
    sectionSpacing?: 'comfortable' | 'compact' | 'airy'
    sectionOrder?: string[]
    hiddenSections?: string[]
  }
}

export interface EventCard {
  _id: string
  title: string
  description: string
  image?: ImageRef
  slug?: {
    current: string
  }
}

export interface EventPage {
  _id: string
  title?: string
  event?: {
    _id: string
  }
  eventDate?: string
  description?: string
  images?: ImageRef[]
  MembersofTeam?: Array<string | { name?: string; link?: string }>
  learned?: string[]
  future?: string
  slug?: {
    current: string
  }
}

export interface EducationItem {
  school?: string
  qualification?: string
  startDate?: string
  endDate?: string
  description?: string
  highlights?: string[]
}

export interface WorkExperienceItem {
  company?: string
  role?: string
  startDate?: string
  endDate?: string
  description?: string
  highlights?: string[]
}

export interface SiteSettings {
  title: string
  subtitle: string
  heroText: string
  about: string
  aboutImage?: ImageRef
  aboutInterests?: string[] | null
  aboutStats?: Array<{ label?: string; value?: string }> | null
  education?: EducationItem[]
  workExperience?: WorkExperienceItem[]
  email: string
  socialLinks?: Array<{ label: string; href: string; logo?: ImageRef }>
}
