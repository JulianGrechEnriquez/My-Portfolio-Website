import { urlFor } from '../../lib/sanity'
import { normalizeUrl } from '../../utils/helpers'
import type { SiteSettings } from '../../types'

type FooterProps = {
  email: string
  socialLinks?: SiteSettings['socialLinks']
}

export function Footer({ email, socialLinks = [] }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/95 px-4 py-8 text-sm text-slate-400 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p>Built with React, Tailwind, Vite, and Sanity.</p>
        <div className="flex flex-wrap items-center gap-3">
          <a className="text-cyan-400 transition hover:text-cyan-200" href={`mailto:${email}`}>
            {email}
          </a>
          {socialLinks.map((link) => {
            const logoSrc = link.logo ? urlFor(link.logo).width(64).height(64).auto('format').url() : undefined

            return (
              <a
                key={`${link.label}-${link.href}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-3 py-2 text-slate-300 transition hover:border-cyan-300 hover:text-white"
                href={normalizeUrl(link.href)}
                rel="noreferrer"
                target="_blank"
              >
                {logoSrc ? <img src={logoSrc} alt="" className="h-4 w-4 rounded-none object-contain" /> : null}
                {link.label}
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
