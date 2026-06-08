import { urlFor } from '../../lib/sanity'
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
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Event</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {page?.title || event.title}
          </h1>
          {eventDate ? <p className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">{eventDate}</p> : null}
          <p className="mt-5 max-w-3xl text-lg text-slate-300">{description}</p>
        </div>
      </section>

      <div className="mt-10 space-y-6">
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
            <ListSection items={page?.MembersofTeam} fallback="Add team members in the Sanity event page document." />
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
