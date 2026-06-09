import { urlFor } from '../../lib/sanity'
import { normalizeUrl } from '../../utils/helpers'
import type { SiteSettings } from '../../types'

type FooterProps = {
  email: string
  siteTitle: string
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

export function Footer({ email, siteTitle, socialLinks = [] }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-4 py-9 text-sm text-slate-400 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5">
        <p>Copyright 2026 {siteTitle}</p>
        <div className="grid w-full max-w-sm gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center">
          <a
            aria-label="Email"
            className="inline-flex min-h-12 w-full items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 font-bold text-slate-300 transition hover:border-cyan-300 hover:text-white sm:h-11 sm:w-11 sm:justify-center sm:gap-0 sm:rounded-full sm:px-0 sm:py-0"
            href={`mailto:${email}`}
          >
            <span>@</span>
            <span className="sm:hidden">Email</span>
          </a>
          {socialLinks.map((link) => {
            const logoSrc = link.logo ? urlFor(link.logo).width(64).height(64).auto('format').url() : undefined

            return (
              <a
                key={`${link.label}-${link.href}`}
                aria-label={link.label}
                className="inline-flex min-h-12 w-full items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-cyan-300 hover:text-white sm:h-11 sm:w-11 sm:justify-center sm:gap-0 sm:rounded-full sm:px-0 sm:py-0"
                href={normalizeUrl(link.href)}
                rel="noreferrer"
                target="_blank"
              >
                {logoSrc ? <img src={logoSrc} alt="" className="h-5 w-5 rounded-none object-contain" /> : getFallbackIcon(link.label)}
                <span className="sm:hidden">{link.label}</span>
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
