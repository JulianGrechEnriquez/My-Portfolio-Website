import { urlFor } from '../../lib/sanity'
import { normalizeUrl } from '../../utils/helpers'
import type { SiteSettings } from '../../types'

type ContactProps = {
  email: string
  socialLinks?: SiteSettings['socialLinks']
}

function getFallbackIcon(label: string) {
  const normalized = label.toLowerCase()

  if (normalized.includes('linkedin')) return 'in'
  if (normalized.includes('twitter') || normalized === 'x') return 'X'
  if (normalized.includes('facebook')) return 'f'
  if (normalized.includes('instagram')) return 'IG'
  if (normalized.includes('github')) return 'GH'

  return label.slice(0, 2).toUpperCase()
}

function getReadableUrl(value: string) {
  return value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
}

export function Contact({ email, socialLinks = [] }: ContactProps) {
  const contactItems = [
    {
      label: 'Email',
      detail: email,
      href: `mailto:${email}`,
      icon: '@',
    },
    ...socialLinks.map((link) => ({
      label: link.label,
      detail: getReadableUrl(link.href),
      href: normalizeUrl(link.href),
      icon: getFallbackIcon(link.label),
      logo: link.logo,
    })),
  ]

  return (
    <section id="contact" className="mt-10 rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20 sm:p-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Connect</p>
          <h2 className="text-3xl font-semibold text-white">Contact</h2>
          <p className="text-slate-300">I'm always happy to collaborate on new games, portfolio projects, or Sanity-powered builds.</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-3">
          {contactItems.map((item) => {
            const logoSrc = item.logo ? urlFor(item.logo).width(80).height(80).auto('format').url() : undefined

            return (
              <a
                key={`${item.label}-${item.href}`}
                className="group flex min-h-20 w-full items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-cyan-300 hover:bg-slate-900"
                href={item.href}
                rel="noreferrer"
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-sm font-bold text-white">
                  {logoSrc ? <img src={logoSrc} alt="" className="h-5 w-5 rounded-none object-contain" /> : item.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">{item.label}</span>
                  <span className="block truncate text-sm text-slate-400">{item.detail}</span>
                </span>
                <span className="text-2xl text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300">&gt;</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
