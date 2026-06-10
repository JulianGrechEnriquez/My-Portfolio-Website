import { useEffect, useState } from 'react'
import client from './lib/sanity'
import { About, Contact, Experience, Hero, Projects } from './components/sections'
import { EventDetail } from './components/sections/EventDetail'
import { GameDetail } from './components/sections/GameDetail'
import { ProjectDetail } from './components/sections/ProjectDetail'
import { EventGrid, GameGrid } from './components/sections/Projects'
import { Footer, Navbar } from './components/common'
import type { EventCard, EventPage, Game, GamePage, Project, ProjectPage, SiteSettings } from './types'

const query = `{
  "settings": *[_type == "siteSettings"][0]{
    title,
    subtitle,
    heroText,
    about,
    aboutImage,
    aboutInterests,
    aboutStats,
    education,
    workExperience,
    email,
    socialLinks[]{label,href,logo}
  },
  "projects": *[_type == "project"] | order(title asc){_id,title,description,link,Gitlink,controls,type,image,slug},
  "projectPages": *[_type == "projectPage"]{
    _id,
    title,
    project->{_id},
    description,
    gameplayImages,
    features,
    tech,
    learned,
    future
  },
  "games": *[_type == "game"] | order(title asc){_id,title,description,Gamelink,Gitlink,controls,type,image,slug},
  "gamePages": *[_type == "gamePage"]{
    _id,
    title,
    game->{_id},
    description,
    gameplayImages,
    features,
    tech,
    learned,
    future,
    heroLayout,
    playButtonText,
    sectionLabels,
    pageLayout
  },
  "events": *[_type == "eventsCard"] | order(title asc){_id,title,description,image,slug},
  "eventPages": *[_type == "eventPage"]{
    _id,
    title,
    event->{_id},
    eventDate,
    description,
    images,
    MembersofTeam,
    learned,
    future,
    slug
  }
}`

const defaultSettings: SiteSettings = {
  title: 'My Portfolio',
  subtitle: 'Interactive games and creative projects built with Sanity',
  heroText:
    'A modern portfolio built with React, Tailwind, Vite, and Sanity as the content loader.',
  about:
    'This portfolio uses Sanity to store portfolio items, games, and event cards in a centralized content backend, then renders them dynamically in a React application.',
  aboutInterests: ['Game Development', 'Creative Coding', 'Unity', 'Sanity CMS'],
  aboutStats: [
    { label: 'Games made', value: '0' },
    { label: 'Projects', value: '0' },
    { label: 'Events', value: '0' },
  ],
  education: [
    {
      school: 'Your school',
      qualification: 'Your qualification',
      description: 'Add your education background in Sanity Site Settings.',
    },
  ],
  workExperience: [
    {
      company: 'Your company',
      role: 'Your role',
      description: 'Add your work experience in Sanity Site Settings.',
    },
  ],
  email: 'hello@example.com',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
}

function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section id="top" className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">{eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="text-slate-300">{text}</p>
      </div>
    </section>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [projectPages, setProjectPages] = useState<ProjectPage[]>([])
  const [games, setGames] = useState<Game[]>([])
  const [gamePages, setGamePages] = useState<GamePage[]>([])
  const [events, setEvents] = useState<EventCard[]>([])
  const [eventPages, setEventPages] = useState<EventPage[]>([])
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname)

  useEffect(() => {
    client
      .fetch(query)
      .then((data) => {
        setSettings(data.settings ?? defaultSettings)
        setProjects(data.projects ?? [])
        setProjectPages(data.projectPages ?? [])
        setGames(data.games ?? [])
        setGamePages(data.gamePages ?? [])
        setEvents(data.events ?? [])
        setEventPages(data.eventPages ?? [])
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname)

    window.addEventListener('popstate', updatePath)
    return () => window.removeEventListener('popstate', updatePath)
  }, [])

  const activeSettings = settings ?? defaultSettings
  const projectSlug = currentPath.startsWith('/projects/') ? decodeURIComponent(currentPath.replace('/projects/', '').replace(/\/$/, '')) : ''
  const selectedProject = projectSlug
    ? projects.find((project) => project.slug?.current === projectSlug || project._id === projectSlug)
    : undefined
  const selectedProjectPage = selectedProject
    ? projectPages.find((page) => page.project?._id === selectedProject._id)
    : undefined
  const gameSlug = currentPath.startsWith('/games/') ? decodeURIComponent(currentPath.replace('/games/', '').replace(/\/$/, '')) : ''
  const selectedGame = gameSlug
    ? games.find((game) => game.slug?.current === gameSlug || game._id === gameSlug)
    : undefined
  const selectedGamePage = selectedGame
    ? gamePages.find((page) => page.game?._id === selectedGame._id)
    : undefined
  const eventSlug = currentPath.startsWith('/events/') ? decodeURIComponent(currentPath.replace('/events/', '').replace(/\/$/, '')) : ''
  const selectedEvent = eventSlug
    ? events.find((event) => event.slug?.current === eventSlug || event._id === eventSlug)
    : undefined
  const selectedEventPage = selectedEvent
    ? eventPages.find((page) => page.event?._id === selectedEvent._id || page.slug?.current === eventSlug)
    : undefined
  const fallbackAboutStats = [
    { label: 'Games made', value: String(games.length) },
    { label: 'Projects', value: String(projects.length) },
    { label: 'Events', value: String(events.length) },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar siteTitle={activeSettings.title} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {selectedProject ? (
          <ProjectDetail project={selectedProject} page={selectedProjectPage} />
        ) : isLoading && projectSlug ? (
          <PageHeader
            eyebrow="Loading"
            title="Loading project page"
            text="The project details are being loaded from Sanity."
          />
        ) : projectSlug ? (
          <PageHeader
            eyebrow="Project not found"
            title="This project page is not available yet"
            text="Check that the project has a slug in Sanity, then come back from the projects section."
          />
        ) : selectedGame ? (
          <GameDetail game={selectedGame} page={selectedGamePage} />
        ) : isLoading && gameSlug ? (
          <PageHeader
            eyebrow="Loading"
            title="Loading game page"
            text="The game details are being loaded from Sanity."
          />
        ) : gameSlug ? (
          <PageHeader
            eyebrow="Game not found"
            title="This game page is not available yet"
            text="Check that the game has a slug in Sanity, then come back from the games page."
          />
        ) : selectedEvent ? (
          <EventDetail event={selectedEvent} page={selectedEventPage} />
        ) : isLoading && eventSlug ? (
          <PageHeader
            eyebrow="Loading"
            title="Loading event page"
            text="The event details are being loaded from Sanity."
          />
        ) : eventSlug ? (
          <PageHeader
            eyebrow="Event not found"
            title="This event page is not available yet"
            text="Check that the event has a slug in Sanity, then come back from the events page."
          />
        ) : currentPath === '/games' ? (
          <>
            <PageHeader
              eyebrow="Playable demos"
              title="Games"
              text="A focused collection of the games I have made, with links to play them or view the source when available."
            />
            <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
              <GameGrid games={games} />
            </section>
          </>
        ) : currentPath === '/events' ? (
          <>
            <PageHeader
              eyebrow="Events"
              title="Events"
              text="Game jams, showcases, and events I have participated in."
            />
            <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
              <EventGrid events={events} />
            </section>
          </>
        ) : (
          <>
            <Hero
              title={activeSettings.title}
              subtitle={activeSettings.subtitle}
              heroText={activeSettings.heroText}
              actionLabel="Get in touch"
            />
            <About
              content={activeSettings.about}
              image={activeSettings.aboutImage}
              interests={activeSettings.aboutInterests}
              stats={activeSettings.aboutStats?.length ? activeSettings.aboutStats : fallbackAboutStats}
              title={activeSettings.title}
            />
            <Experience
              education={activeSettings.education}
              workExperience={activeSettings.workExperience}
            />
            <Projects projects={projects} games={games} events={events} />
            <Contact email={activeSettings.email} socialLinks={activeSettings.socialLinks} />
          </>
        )}
      </main>
      <Footer
        email={activeSettings.email}
        siteTitle={activeSettings.title}
        socialLinks={activeSettings.socialLinks}
      />
    </div>
  )
}

export default App
