import { Button } from '@/components/ui/button'
import { Headset } from 'lucide-react'

function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border bg-accent/40 px-3 py-1 text-sm font-medium text-accent-foreground">
        <Headset className="size-4" aria-hidden="true" />
        Dashboard de soporte
      </span>
      <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-balance">
        Espacio de trabajo para tu equipo de soporte
      </h1>
      <p className="max-w-md text-pretty text-muted-foreground">
        El dashboard de gestión de tickets construido con React, Vite, Tailwind
        CSS y shadcn/ui. Próximamente: métricas, KPIs e historial de
        conversaciones.
      </p>
      <Button size="lg">Comenzar</Button>
    </main>
  )
}

export default App