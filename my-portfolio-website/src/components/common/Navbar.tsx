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
        {isOpen ? (
          <nav className="mt-4 grid gap-2 border-t border-slate-800 pt-4 text-sm text-slate-200 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-lg px-3 py-3 transition hover:bg-slate-900 hover:text-white"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  )
}
