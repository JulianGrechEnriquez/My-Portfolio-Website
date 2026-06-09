import { useState } from 'react'
import { navItems } from '../../constants'

type NavbarProps = {
  siteTitle: string
}

export function Navbar({ siteTitle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="text-lg font-semibold text-white" onClick={() => setIsOpen(false)}>
            {siteTitle}
          </a>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <a key={item.href} className="transition hover:text-white" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            aria-expanded={isOpen}
            aria-label="Open navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100 transition hover:border-cyan-300 md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span className="h-0.5 rounded-full bg-current" />
              <span className="h-0.5 rounded-full bg-current" />
              <span className="h-0.5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 z-[80] min-h-screen bg-slate-950 px-6 py-6 md:hidden">
          <div className="flex items-center justify-between">
            <a href="/" className="text-lg font-semibold text-white" onClick={() => setIsOpen(false)}>
              {siteTitle}
            </a>
            <button
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-2xl leading-none text-slate-100 transition hover:border-cyan-300"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              ×
            </button>
          </div>
          <nav className="mt-16 grid gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-5 text-2xl font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
