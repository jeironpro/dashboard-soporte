import { useEffect, useRef } from 'react'
import { Plus, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'

function obtenerTitulo(pathname: string): string {
  if (pathname === '/') return 'Panel'
  if (pathname === '/tickets') return 'Tickets'
  if (pathname.startsWith('/tickets/')) return 'Ticket'
  return 'NubeCart · Soporte'
}

export function Header() {
  const location = useLocation()
  const titulo = obtenerTitulo(location.pathname)
  const tituloRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    tituloRef.current?.focus({ preventScroll: true })
  }, [location.pathname])

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
      <SidebarTrigger aria-label="Abrir o cerrar la barra lateral" />
      <h1
        ref={tituloRef}
        tabIndex={-1}
        className="truncate font-heading text-lg font-semibold tracking-tight outline-none"
      >
        {titulo}
      </h1>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search
            aria-hidden="true"
            className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label="Buscar tickets"
            placeholder="Buscar tickets…"
            className="h-8 w-52 bg-background pl-8 md:w-64"
          />
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus aria-hidden="true" />
          Nuevo ticket
        </Button>
      </div>
    </header>
  )
}