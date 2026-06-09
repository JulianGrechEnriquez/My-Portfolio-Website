import { urlFor } from '../../lib/sanity'
import type { ImageRef } from '../../types'

type AboutProps = {
  content: string
  image?: ImageRef
  interests?: string[] | null
  stats?: Array<{ label?: string; value?: string }> | null
  title?: string
}

function getParagraphs(content: string) {
  return (content || '')
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export function About({ content, image, interests = [], stats = [], title = 'Portfolio' }: AboutProps) {
  const imageSrc = image ? urlFor(image).width(760).height(900).auto('format').url() : undefined
  const paragraphs = getParagraphs(content)
  const visibleInterests = interests?.length ? interests : ['Game Development', 'Interactive Media', 'Creative Coding']
  const visibleStats = stats?.length
    ? stats
    : [
        { label: 'Games made', value: '0' },
        { label: 'Projects', value: '0' },
        { label: 'Events', value: '0' },
      ]

  return (
    <section id="about" className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20 sm:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:items-start">
        <aside className="space-y-7">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-cyan-950/20">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950">
              {imageSrc ? (
                <img src={imageSrc} alt="Portfolio profile" className="h-[32rem] w-full rounded-none object-cover" />
              ) : (
                <div className="flex h-[32rem] items-center justify-center px-6 text-center text-slate-400">
                  Add your about photo in Sanity site settings.
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Focus Areas</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {visibleInterests.map((interest) => (
                <span key={interest} className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {visibleStats.slice(0, 3).map((stat) => (
              <div key={`${stat.label}-${stat.value}`} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </aside>

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/40">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-4">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <p className="text-xs font-semibold tracking-wide text-slate-400">
              profile://about/{title.replace(/\s+/g, '-').toLowerCase()}
            </p>
          </div>

          <div className="p-7 sm:p-10">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                About Me
              </span>
              <span className="h-px min-w-12 flex-1 bg-slate-800" />
            </div>

            <div className="space-y-6 font-mono text-base leading-8 text-slate-300 sm:text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`}>
                  <span className="select-none text-cyan-400">0{index + 1}</span>
                  <span className="select-none text-slate-600"> / </span>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
