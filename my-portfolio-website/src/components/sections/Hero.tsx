import { Button } from '../common/Button'

type HeroProps = {
  title: string
  subtitle: string
  heroText: string
  actionLabel: string
}

export function Hero({ title, subtitle, heroText, actionLabel }: HeroProps) {
  return (
    <section id="top" className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
      <div className="max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Portfolio</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="text-xl text-slate-300">{subtitle}</p>
        <p className="max-w-2xl text-slate-400">{heroText}</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href="#contact">{actionLabel}</Button>
          <Button href="#projects" variant="secondary">
            Browse projects
          </Button>
        </div>
      </div>
    </section>
  )
}
