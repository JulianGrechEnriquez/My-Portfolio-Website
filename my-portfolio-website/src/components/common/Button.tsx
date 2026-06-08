import type { ReactNode } from 'react'

type ButtonProps = {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Button({ href, onClick, children, variant = 'primary', className = '' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2'
  const style =
    variant === 'secondary'
      ? 'bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-400'
      : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 focus:ring-cyan-300'

  const classes = `${base} ${style} ${className}`.trim()

  if (href) {
    return (
      <a className={classes} href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} type="button">
      {children}
    </button>
  )
}
