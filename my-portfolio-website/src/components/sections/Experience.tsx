import { useState } from 'react'
import type { EducationItem, WorkExperienceItem } from '../../types'

type TimelineItem = {
  title?: string
  subtitle?: string
  startDate?: string
  endDate?: string
  description?: string
  highlights?: string[]
}

type ExperienceProps = {
  education?: EducationItem[]
  workExperience?: WorkExperienceItem[]
}

const defaultEducation: EducationItem[] = [
  {
    school: 'Add your school in Sanity',
    qualification: 'Education Background',
    description: 'Use Site Settings to add your education, dates, and highlights.',
  },
]

const defaultWork: WorkExperienceItem[] = [
  {
    company: 'Add your workplace in Sanity',
    role: 'Work Experience',
    description: 'Use Site Settings to add your roles, companies, dates, and highlights.',
  },
]

function dateRange(startDate?: string, endDate?: string) {
  if (startDate && endDate) {
    return `${startDate} - ${endDate}`
  }

  return startDate || endDate || 'Timeline'
}

function shortDateRange(startDate?: string, endDate?: string) {
  const start = startDate?.slice(0, 4) || startDate
  const end = endDate?.slice(0, 4) || endDate

  if (start && end) {
    return `${start}-${end}`
  }

  return start || end || 'Now'
}

function TimelineSection({
  id,
  title,
  intro,
  items,
}: {
  id: string
  title: string
  intro: string
  items: TimelineItem[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = items[activeIndex] ?? items[0]

  return (
    <section id={id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 px-6 py-10 shadow-xl shadow-slate-950/20 sm:px-8 sm:py-12">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base text-slate-300">{intro}</p>
      </div>

      <div className="mt-12">
        <div className="relative mx-auto max-w-5xl px-2 pt-8">
          <div className="absolute left-10 right-10 top-[3.1rem] hidden h-px bg-slate-700 sm:block" />
          <div className="grid gap-x-3 gap-y-8 sm:gap-0" style={{ gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))` }}>
            {items.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <button
                  key={`${item.title}-${item.subtitle}-${index}`}
                  aria-pressed={isActive}
                  className="group relative flex min-h-28 flex-col items-center px-1 py-1 text-center transition focus:outline-none"
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <p className={`mb-4 text-xs font-bold tracking-[0.18em] transition ${isActive ? 'text-cyan-300' : 'text-slate-600 group-hover:text-slate-400'}`}>
                    {shortDateRange(item.startDate, item.endDate)}
                  </p>
                  <div className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full ${isActive ? 'bg-cyan-400/20 ring-2 ring-cyan-400' : 'bg-slate-500'}`}>
                    <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-cyan-300' : 'bg-slate-300'}`} />
                  </div>
                  <p className={`mt-5 max-w-40 text-center text-[0.65rem] font-bold uppercase leading-relaxed tracking-wide transition ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'}`}>
                    {item.title}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <article className="mx-auto mt-8 max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
        <p className="text-sm font-bold tracking-[0.25em] text-cyan-300">
          {dateRange(activeItem?.startDate, activeItem?.endDate)}
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-white">{activeItem?.title}</h3>
        {activeItem?.subtitle ? <p className="mt-3 font-semibold text-cyan-300">{activeItem.subtitle}</p> : null}
        {activeItem?.description ? <p className="mt-6 max-w-4xl leading-7 text-slate-300">{activeItem.description}</p> : null}
        {activeItem?.highlights?.length ? (
          <ul className="mt-6 grid gap-3 text-slate-300">
            {activeItem.highlights.map((highlight) => (
              <li key={highlight} className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </section>
  )
}

export function Experience({ education, workExperience }: ExperienceProps) {
  const educationItems = (education?.length ? education : defaultEducation).map((item) => ({
    title: item.qualification,
    subtitle: item.school,
    startDate: item.startDate,
    endDate: item.endDate,
    description: item.description,
    highlights: item.highlights,
  }))
  const workItems = (workExperience?.length ? workExperience : defaultWork).map((item) => ({
    title: item.role,
    subtitle: item.company,
    startDate: item.startDate,
    endDate: item.endDate,
    description: item.description,
    highlights: item.highlights,
  }))

  return (
    <div className="mt-10 grid gap-10 xl:grid-cols-2">
      <TimelineSection
        id="education"
        title="Academic Background"
        intro="Select a point in the timeline to explore my education background."
        items={educationItems}
      />
      <TimelineSection
        id="experience"
        title="Work Experience"
        intro="Select a point in the timeline to explore my roles, placements, and professional experience."
        items={workItems}
      />
    </div>
  )
}
