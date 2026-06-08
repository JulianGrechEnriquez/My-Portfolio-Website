import { urlFor } from '../../lib/sanity'
import { normalizeUrl } from '../../utils/helpers'
import type { SiteSettings } from '../../types'

type ContactProps = {
  email: string
  socialLinks?: SiteSettings['socialLinks']
}

export function Contact({ email, socialLinks = [] }: ContactProps) {
  return (
    <section id="contact" className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
      <div className="max-w-3xl space-y-4">
        <h2 className="text-3xl font-semibold text-white">Contact</h2>
        <p className="text-slate-300">I'm always happy to collaborate on new games, portfolio projects, or Sanity-powered builds.</p>
        <div className="flex flex-wrap gap-3">
          <a className="inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400" href={`mailto:${email}`}>
            Email me
          </a>
          {socialLinks.map((link) => {
            const logoSrc = link.logo ? urlFor(link.logo).width(80).height(80).auto('format').url() : undefined

            return (
              <a
                key={`${link.label}-${link.href}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-white"
                href={normalizeUrl(link.href)}
                rel="noreferrer"
                target="_blank"
              >
                {logoSrc ? <img src={logoSrc} alt="" className="h-5 w-5 rounded-none object-contain" /> : null}
                {link.label}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
