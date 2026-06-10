import { useState } from 'react'
import { urlFor } from '../../lib/sanity'
import { normalizeUrl } from '../../utils/helpers'
import type { EventCard, Game, Project } from '../../types'

type ProjectsProps = {
  projects: Project[]
  games: Game[]
  events: EventCard[]
}

type CardImageProps = {
  image?: unknown
  title: string
}

function getItemId(item: { _id: string; slug?: { current: string } }) {
  return item.slug?.current || item._id
}

function getGamePath(game: Game) {
  return `/games/${encodeURIComponent(getItemId(game))}`
}

function getProjectPath(project: Project) {
  return `/projects/${encodeURIComponent(getItemId(project))}`
}

function getEventPath(event: EventCard) {
  return `/events/${encodeURIComponent(getItemId(event))}`
}

function CardImage({ image, title }: CardImageProps) {
  const src = image ? urlFor(image).width(900).height(520).auto('format').url() : undefined

  return (
    <div className="overflow-hidden rounded-3xl bg-slate-950 shadow-lg shadow-slate-950/40">
      {src ? (
        <img src={src} alt={title} className="h-56 w-full object-cover" />
      ) : (
        <div className="flex h-56 items-center justify-center bg-slate-800 text-slate-400">No image</div>
      )}
    </div>
  )
}

function GameCard({ game }: { game: Game }) {
  const [isMobileActive, setIsMobileActive] = useState(false)

  return (
    <article id={getItemId(game)} className="group relative min-w-[82vw] snap-center space-y-4 rounded-3xl border border-slate-800 bg-slate-950/50 p-6 shadow-lg shadow-slate-950/20 transition hover:border-cyan-400/60 sm:min-w-[22rem] md:min-w-0">
      <a aria-label={`Open ${game.title} game page`} className="absolute inset-0 z-10 hidden rounded-3xl md:block" href={getGamePath(game)} />
      <div className={isMobileActive ? 'blur-sm transition md:blur-none' : 'transition'}>
        <CardImage image={game.image} title={game.title} />
      </div>
      <div className={`relative space-y-3 ${isMobileActive ? 'blur-sm transition md:blur-none' : 'transition'}`}>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-cyan-300">
          <span>{game.type || 'Game'}</span>
          {game.controls?.map((control) => (
            <span key={control} className="rounded-full bg-slate-800 px-2 py-1">
              {control}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-100">{game.title}</h3>
        <p className="text-slate-400">{game.description}</p>
        <div className="flex flex-wrap gap-4 text-cyan-300">
          {game.Gamelink ? (
            <a className="relative z-20 hover:text-cyan-100" href={normalizeUrl(game.Gamelink)} rel="noreferrer" target="_blank">
              Play game
            </a>
          ) : null}
          {game.Gitlink ? (
            <a className="relative z-20 hover:text-cyan-100" href={normalizeUrl(game.Gitlink)} rel="noreferrer" target="_blank">
              View source
            </a>
          ) : null}
        </div>
      </div>
      <button
        aria-label={`Show actions for ${game.title}`}
        className="absolute inset-0 z-10 rounded-3xl md:hidden"
        onClick={() => setIsMobileActive(true)}
        type="button"
      />
      {isMobileActive ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center rounded-3xl bg-slate-950/55 p-6 backdrop-blur-sm md:hidden">
          <a className="inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/30 transition hover:bg-cyan-400" href={getGamePath(game)}>
            Learn more
          </a>
        </div>
      ) : null}
    </article>
  )
}

function EventCardItem({ event }: { event: EventCard }) {
  const [isMobileActive, setIsMobileActive] = useState(false)

  return (
    <article id={getItemId(event)} className="group relative min-w-[82vw] snap-center space-y-4 rounded-3xl border border-slate-800 bg-slate-950/50 p-6 shadow-lg shadow-slate-950/20 transition hover:border-cyan-400/60 sm:min-w-[22rem] md:min-w-0">
      <a aria-label={`Open ${event.title} on the events page`} className="absolute inset-0 z-10 hidden rounded-3xl md:block" href={getEventPath(event)} />
      <div className={isMobileActive ? 'blur-sm transition md:blur-none' : 'transition'}>
        <CardImage image={event.image} title={event.title} />
      </div>
      <div className={`relative space-y-3 ${isMobileActive ? 'blur-sm transition md:blur-none' : 'transition'}`}>
        <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-100">{event.title}</h3>
        <p className="text-slate-400">{event.description}</p>
      </div>
      <button
        aria-label={`Show actions for ${event.title}`}
        className="absolute inset-0 z-10 rounded-3xl md:hidden"
        onClick={() => setIsMobileActive(true)}
        type="button"
      />
      {isMobileActive ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center rounded-3xl bg-slate-950/55 p-6 backdrop-blur-sm md:hidden">
          <a className="inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/30 transition hover:bg-cyan-400" href={getEventPath(event)}>
            Learn more
          </a>
        </div>
      ) : null}
    </article>
  )
}

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <div className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0">
      {games.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  )
}

export function EventGrid({ events }: { events: EventCard[] }) {
  return (
    <div className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
      {events.map((event) => (
        <EventCardItem key={event._id} event={event} />
      ))}
    </div>
  )
}

export function Projects({ projects, games, events }: ProjectsProps) {
  return (
    <section id="projects" className="mt-10 space-y-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Featured work</p>
          <h2 className="text-3xl font-semibold text-white">Projects and games</h2>
          <p className="max-w-2xl text-slate-400">Every item below is loaded from Sanity, so content is managed separately from this app.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project._id} className="group relative space-y-4 rounded-3xl border border-slate-800 bg-slate-950/50 p-6 shadow-lg shadow-slate-950/20 transition hover:border-cyan-400/60">
              <a aria-label={`Open ${project.title} project page`} className="absolute inset-0 z-10 rounded-3xl" href={getProjectPath(project)} />
              <CardImage image={project.image} title={project.title} />
              <div className="relative space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-cyan-300">
                  <span>{project.type || 'Project'}</span>
                  {project.controls?.map((control) => (
                    <span key={control} className="rounded-full bg-slate-800 px-2 py-1">
                      {control}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-100">{project.title}</h3>
                <p className="text-slate-400">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.link ? (
                    <a href={normalizeUrl(project.link)} rel="noreferrer" target="_blank" className="relative z-20 inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                      View project
                    </a>
                  ) : null}
                  {project.Gitlink ? (
                    <a href={normalizeUrl(project.Gitlink)} rel="noreferrer" target="_blank" className="relative z-20 inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-white">
                      Git link
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div id="games" className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Playable demos</p>
          <h2 className="text-3xl font-semibold text-white">Games</h2>
          <a className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-100" href="/games">
            View all games
          </a>
        </div>

        <div className="mt-8">
          <GameGrid games={games} />
        </div>
      </div>

      <div id="events" className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Events</p>
          <h2 className="text-3xl font-semibold text-white">Featured event cards</h2>
          <a className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-100" href="/events">
            View all events
          </a>
        </div>

        <div className="mt-8">
          <EventGrid events={events} />
        </div>
      </div>
    </section>
  )
}
