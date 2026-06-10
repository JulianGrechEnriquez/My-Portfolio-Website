import { urlFor } from '../../lib/sanity'
import { normalizeUrl } from '../../utils/helpers'
import type { EventCard, EventPage, ImageRef } from '../../types'

type EventDetailProps = {
  event: EventCard
  page?: EventPage
}

function getImageUrl(image?: ImageRef, width = 1200, height = 720) {
  return image ? urlFor(image).width(width).height(height).auto('format').url() : undefined
}

function formatDate(date?: string) {
  if (!date) {
    return undefined
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function getEventTypeLabel(type?: EventPage['eventType']) {
  if (type === 'inPerson') return 'In-person Event'
  if (type === 'gameJam') return 'Game Jam'
  if (type === 'online') return 'Online Event'
  if (type === 'showcase') return 'Showcase'

  return 'Event'
}

function getGamePath(game: NonNullable<EventPage['gameJamGame']>) {
  return `/games/${encodeURIComponent(game.slug?.current || game._id)}`
}

function ListSection({ items, fallback }: { items?: string[]; fallback: string }) {
  if (!items?.length) {
    return <p className="text-slate-400">{fallback}</p>
  }

  return (
    <ul className="grid gap-3 text-slate-300 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
          {item}
        </li>
      ))}
    </ul>
  )
}

function TeamMembersSection({ members }: { members?: EventPage['MembersofTeam'] }) {
  if (!members?.length) {
    return <p className="text-slate-400">Add team members in the Sanity event page document.</p>
  }

  return (
    <ul className="grid gap-3 text-slate-300 sm:grid-cols-2">
      {members.map((member, index) => {
        const name = typeof member === 'string' ? member : member.name
        const link = typeof member === 'string' ? undefined : member.link

        if (!name) {
          return null
        }

        return (
          <li key={`${name}-${index}`} className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
            {link ? (
              <a className="block text-slate-300 transition hover:text-cyan-200" href={link} rel="noreferrer" target="_blank">
                {name}
              </a>
            ) : (
              name
            )}
          </li>
        )
      })}
    </ul>
  )
}

function EventDetails({ page }: { page?: EventPage }) {
  if (!page) {
    return null
  }

  if (page.eventType === 'gameJam') {
    const hasDetails = page.gameJamDuration || page.gameJamGame || page.gameJamOverview

    if (!hasDetails) {
      return null
    }

    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
        <h2 className="text-2xl font-semibold text-white">Game Jam Details</h2>
        <div className="mt-4 grid gap-3 text-slate-300 sm:grid-cols-2">
          {page.gameJamDuration ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Duration</p>
              <p className="mt-2">{page.gameJamDuration}</p>
            </div>
          ) : null}
          {page.gameJamGame ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Game</p>
              <a className="mt-2 block text-slate-300 transition hover:text-cyan-200" href={getGamePath(page.gameJamGame)}>
                {page.gameJamGame.title || 'Open game'}
              </a>
            </div>
          ) : null}
        </div>
        {page.gameJamOverview ? <p className="mt-5 max-w-4xl leading-7 text-slate-300">{page.gameJamOverview}</p> : null}
      </section>
    )
  }

  if (page.eventType === 'inPerson' && (page.eventLocation || page.eventWebsite)) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
        <h2 className="text-2xl font-semibold text-white">Event Details</h2>
        <div className="mt-4 grid gap-3 text-slate-300 sm:grid-cols-2">
          {page.eventLocation ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Location</p>
              <p className="mt-2">{page.eventLocation}</p>
            </div>
          ) : null}
          {page.eventWebsite ? (
            <a className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-slate-300 transition hover:border-cyan-300 hover:text-cyan-200" href={normalizeUrl(page.eventWebsite)} rel="noreferrer" target="_blank">
              <span className="block text-xs uppercase tracking-[0.25em] text-cyan-300">Website</span>
              <span className="mt-2 block">Open event website</span>
            </a>
          ) : null}
        </div>
      </section>
    )
  }

  return null
}

export function EventDetail({ event, page }: EventDetailProps) {
  const heroImage = getImageUrl(event.image, 1400, 780)
  const eventDate = formatDate(page?.eventDate)
  const description = page?.description || event.description

  return (
    <div>
      <a className="inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-100" href="/events">
        Back to events
      </a>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/20">
        {heroImage ? <img src={heroImage} alt={event.title} className="h-72 w-full rounded-none object-cover sm:h-96" /> : null}
        <div className="p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">{getEventTypeLabel(page?.eventType)}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {page?.title || event.title}
          </h1>
          {eventDate ? <p className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">{eventDate}</p> : null}
          <p className="mt-5 max-w-3xl text-lg text-slate-300">{description}</p>
        </div>
      </section>

      <div className="mt-10 space-y-6">
        <EventDetails page={page} />

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Event Photos</h2>
          <div className="mt-4">
            {page?.images?.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.images.map((image, index) => {
                  const src = getImageUrl(image, 900, 620)
                  return src ? (
                    <img
                      key={`${image.asset._ref}-${index}`}
                      src={src}
                      alt={`${event.title} photo ${index + 1}`}
                      className="h-60 w-full rounded-2xl object-cover shadow-lg shadow-slate-950/30"
                    />
                  ) : null
                })}
              </div>
            ) : (
              <p className="text-slate-400">Add event photos in the Sanity event page document.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Team Members</h2>
          <div className="mt-4">
            <TeamMembersSection members={page?.MembersofTeam} />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">What I Learned</h2>
          <div className="mt-4">
            <ListSection items={page?.learned} fallback="Add what you learned in the Sanity event page document." />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Future Improvements</h2>
          <p className="mt-4 text-slate-300">{page?.future || 'Add future notes in the Sanity event page document.'}</p>
        </section>
      </div>
    </div>
  )
}
