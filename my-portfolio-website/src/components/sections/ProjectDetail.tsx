import type { ReactNode } from 'react'
import { urlFor } from '../../lib/sanity'
import { normalizeUrl } from '../../utils/helpers'
import type { ImageRef, Project, ProjectPage } from '../../types'

type ProjectDetailProps = {
  project: Project
  page?: ProjectPage
}

function getImageUrl(image?: ImageRef, width = 1200, height = 720) {
  return image ? urlFor(image).width(width).height(height).auto('format').url() : undefined
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function ListSection({ items }: { items?: string[] }) {
  if (!items?.length) {
    return <p className="text-slate-400">Add this section content in the Sanity project page document.</p>
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

export function ProjectDetail({ project, page }: ProjectDetailProps) {
  const heroImage = getImageUrl(project.image, 1400, 780)
  const overview = page?.description || project.description

  return (
    <div className="-mx-4 px-4 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <a className="inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-100" href="/#projects">
        Back to projects
      </a>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/20">
        {heroImage ? <img src={heroImage} alt={project.title} className="h-72 w-full rounded-none object-cover sm:h-96" /> : null}
        <div className="p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            {project.type || 'Project'}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {page?.title || project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{overview}</p>
          {project.link ? (
            <div className="mt-6">
              <a className="inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400" href={normalizeUrl(project.link)} rel="noreferrer" target="_blank">
                Open project
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <div className="mt-10 space-y-6">
        <Section title="Overview">
          <p className="max-w-4xl text-slate-300">{overview}</p>
        </Section>

        <Section title="Project Images">
          {page?.gameplayImages?.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {page.gameplayImages.map((image, index) => {
                const src = getImageUrl(image)
                return src ? (
                  <img
                    key={`${image.asset._ref}-${index}`}
                    src={src}
                    alt={`${project.title} image ${index + 1}`}
                    className="h-64 w-full rounded-2xl object-cover"
                  />
                ) : null
              })}
            </div>
          ) : (
            <p className="text-slate-400">Add project images in the Sanity project page document.</p>
          )}
        </Section>

        <Section title="Features">
          <ListSection items={page?.features} />
        </Section>

        <Section title="Tech Stack">
          <ListSection items={page?.tech} />
        </Section>

        <Section title="What I Learned">
          <ListSection items={page?.learned} />
        </Section>

        <Section title="Future Improvements">
          <p className="text-slate-300">{page?.future || 'Add future improvement notes in the Sanity project page document.'}</p>
        </Section>
      </div>
    </div>
  )
}
