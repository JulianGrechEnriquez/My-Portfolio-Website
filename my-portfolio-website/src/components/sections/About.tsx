import { urlFor } from '../../lib/sanity'
import type { ImageRef } from '../../types'

type AboutProps = {
  content: string
  image?: ImageRef
}

export function About({ content, image }: AboutProps) {
  const imageSrc = image ? urlFor(image).width(700).height(850).auto('format').url() : undefined

  return (
    <section id="about" className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
          {imageSrc ? (
            <img src={imageSrc} alt="Portfolio profile" className="h-full max-h-[520px] w-full object-cover" />
          ) : (
            <div className="flex min-h-80 items-center justify-center px-6 text-center text-slate-400">
              Add your about photo in Sanity site settings.
            </div>
          )}
        </div>
        <div className="max-w-4xl space-y-4">
          <h2 className="text-2xl font-semibold text-white">About Me</h2>
          <p className="text-slate-300">{content}</p>
        </div>
      </div>
    </section>
  )
}
