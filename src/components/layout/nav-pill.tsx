import { Headset, Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TICKETS } from '@/lib/mock'
import { getConteoPorEstado } from '@/lib/stats'

const NAV_PRINCIPAL = [
  { titulo: 'Panel', to: '/', end: true },
  { titulo: 'Tickets', to: '/tickets', end: false },
]

export function NavPill() {
  const conteoAbiertos = getConteoPorEstado(TICKETS).abierto

  return (
    <nav
      aria-label="Principal"
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <div className="flex w-full max-w-fit items-center gap-1 rounded-full border border-border bg-background/80 py-1.5 pr-1.5 pl-2 shadow-[0_8px_30px_-12px_rgba(20,30,80,0.18)] backdrop-blur-xl">
        <NavLink
          to="/"
          aria-label="NubeCart · Panel"
          className="flex items-center gap-2 rounded-full pr-1.5 py-1 text-sm font-semibold tracking-tight text-foreground transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:bg-muted"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-primary-foreground">
            <Headset className="size-3.5" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">NubeCart</span>
        </NavLink>

        <span aria-hidden="true" className="mx-0.5 h-4 w-px bg-border" />

        {NAV_PRINCIPAL.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium text-ink-2 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]',
                isActive
                  ? 'bg-muted text-foreground'
                  : 'hover:bg-paper-2 hover:text-foreground',
              ].join(' ')
            }
          >
            {item.titulo}
            {item.to === '/tickets' && conteoAbiertos > 0 && (
              <Badge
                variant="outline"
                className="h-4 min-w-4 px-1 rounded-full text-[10px] tabular-nums"
              >
                {conteoAbiertos}
              </Badge>
            )}
          </NavLink>
        ))}

        <div className="ml-1">
          <Button size="sm" className="gap-1.5">
            <Plus aria-hidden="true" />
            Nuevo ticket
          </Button>
        </div>
      </div>
    </nav>
  )
}
