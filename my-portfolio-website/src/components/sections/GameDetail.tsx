import type { ReactNode } from 'react'
import { urlFor } from '../../lib/sanity'
import { normalizeUrl } from '../../utils/helpers'
import type { Game, GamePage, ImageRef } from '../../types'

type GameDetailProps = {
  game: Game
  page?: GamePage
}

const defaultSectionOrder = ['overview', 'gameplay', 'features', 'tech']

function getImageUrl(image?: ImageRef, width = 1200, height = 720) {
  return image ? urlFor(image).width(width).height(height).auto('format').url() : undefined
}

function getGameTypeLabel(type?: string) {
  if (type?.toLowerCase() === '2d') return '2D Game'
  if (type?.toLowerCase() === '3d') return '3D Game'

  return type || 'Game'
}

function getControlLabel(control: string) {
  if (control === 'keyboard') return 'Keyboard & Mouse'
  if (control === 'controller') return 'Controller'
  if (control === 'mobile') return 'Mobile'

  return control
}

function getGameGenres(genre?: Game['genre']) {
  if (Array.isArray(genre)) {
    return genre.filter(Boolean)
  }

  return genre ? [genre] : []
}

function getVideoEmbedUrl(value: string) {
  try {
    const url = new URL(value)

    if (url.hostname.includes('youtube.com')) {
      const videoId = url.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : value
    }

    if (url.hostname.includes('youtu.be')) {
      const videoId = url.pathname.replace('/', '')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : value
    }

    if (url.hostname.includes('vimeo.com')) {
      const videoId = url.pathname.split('/').filter(Boolean).pop()
      return videoId ? `https://player.vimeo.com/video/${videoId}` : value
    }
  } catch {
    return value
  }

  return value
}

function GameplayVideo({ url }: { url: string }) {
  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url)
  const src = isDirectVideo ? url : getVideoEmbedUrl(url)

  if (isDirectVideo) {
    return (
      <video className="max-h-[36rem] w-full rounded-2xl bg-slate-950 object-contain" controls src={src}>
        <track kind="captions" />
      </video>
    )
  }

  return (
    <div className="aspect-video overflow-hidden rounded-2xl bg-slate-950">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full rounded-none"
        src={src}
        title="Gameplay video"
      />
    </div>
  )
}

function Section({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:p-8 ${className}`}>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function ListSection({ items }: { items?: string[] }) {
  if (!items?.length) {
    return <p className="text-slate-400">Add this section content in the Sanity game page document.</p>
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

export function GameDetail({ game, page }: GameDetailProps) {
  const labels = page?.sectionLabels ?? {}
  const hiddenSections = new Set(page?.pageLayout?.hiddenSections ?? [])
  const orderedSections = [
    ...(page?.pageLayout?.sectionOrder ?? []),
    ...defaultSectionOrder.filter((section) => !page?.pageLayout?.sectionOrder?.includes(section)),
  ].filter((section) => !hiddenSections.has(section))

  const heroImage = getImageUrl(game.image, 1400, 780)
  const gameplayLayout = page?.pageLayout?.gameplayLayout ?? 'grid'
  const imageShape = page?.pageLayout?.imageShape ?? 'rounded'
  const contentLayout = page?.pageLayout?.contentLayout ?? 'stacked'
  const spacing = page?.pageLayout?.sectionSpacing === 'compact' ? 'mt-6' : page?.pageLayout?.sectionSpacing === 'airy' ? 'mt-14' : 'mt-10'
  const overview = page?.description || game.description
  const genres = getGameGenres(game.genre)

  const renderedSections: Record<string, React.ReactNode> = {
    overview: (
      <Section key="overview" title={labels.overview ?? 'Overview'}>
        <p className="max-w-4xl text-slate-300">{overview}</p>
      </Section>
    ),
    gameplay: (
      <Section key="gameplay" title={labels.gameplay ?? 'Gameplay'}>
        {page?.gameplayVideoUrl || page?.gameplayImages?.length ? (
          <div className="space-y-4">
            {page?.gameplayVideoUrl ? <GameplayVideo url={page.gameplayVideoUrl} /> : null}
            {page?.gameplayImages?.length ? (
              <div
                className={
                  gameplayLayout === 'strip'
                    ? 'flex gap-4 overflow-x-auto pb-2'
                    : gameplayLayout === 'featured'
                      ? 'grid gap-4 lg:grid-cols-[1.3fr_0.7fr]'
                      : 'grid gap-4 sm:grid-cols-2'
                }
              >
                {page.gameplayImages.map((image, index) => {
                  const src = getImageUrl(image)
                  return src ? (
                    <img
                      key={`${image.asset._ref}-${index}`}
                      src={src}
                      alt={`${game.title} gameplay ${index + 1}`}
                      className={`${gameplayLayout === 'strip' ? 'h-64 min-w-80' : 'h-64 w-full'} ${imageShape === 'square' ? 'rounded-none' : 'rounded-2xl'} ${imageShape === 'shadow' ? 'shadow-2xl shadow-slate-950/40' : ''} object-cover`}
                    />
                  ) : null
                })}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-slate-400">Add a gameplay video or screenshots in the Sanity game page document.</p>
        )}
      </Section>
    ),
    features: (
      <Section key="features" title={labels.features ?? 'Features'}>
        <ListSection items={page?.features} />
      </Section>
    ),
    tech: (
      <Section key="tech" title={labels.tech ?? 'Tech Stack'}>
        <ListSection items={page?.tech} />
      </Section>
    ),
  }

  return (
    <div className="-mx-4 px-4 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <a className="inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-100" href="/games">
        Back to games
      </a>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/20">
        {heroImage ? <img src={heroImage} alt={game.title} className="max-h-[36rem] w-full rounded-none object-contain" /> : null}
        <div className="p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            {getGameTypeLabel(game.type)}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {page?.title || game.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
            {genres.map((genre) => (
              <span key={genre} className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-2 text-cyan-200">
                {genre}
              </span>
            ))}
            {game.controls?.map((control) => (
              <span key={control} className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-300">
                {getControlLabel(control)}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{overview}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {game.Gamelink ? (
              <a className="inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400" href={normalizeUrl(game.Gamelink)} rel="noreferrer" target="_blank">
                {page?.playButtonText || 'Play game'}
              </a>
            ) : null}
            {game.Gitlink ? (
              <a className="inline-flex rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-white" href={normalizeUrl(game.Gitlink)} rel="noreferrer" target="_blank">
                View source
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <div className={`${spacing} ${contentLayout === 'two-column' ? 'grid gap-6 lg:grid-cols-2' : 'space-y-6'}`}>
        {orderedSections.map((section) => renderedSections[section]).filter(Boolean)}
      </div>
    </div>
  )
}
