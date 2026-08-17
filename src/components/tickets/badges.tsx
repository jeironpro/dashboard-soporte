import type { Prioridad, TicketEstado } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

export const ETIQUETAS_ESTADO: Record<TicketEstado, string> = {
  abierto: 'Abierto',
  en_progreso: 'En progreso',
  cerrado: 'Cerrado',
}

export const ETIQUETAS_PRIORIDAD: Record<Prioridad, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
  critica: 'Crítica',
}

const COLORES_ESTADO: Record<TicketEstado, string> = {
  abierto: 'border-transparent bg-amber-100 text-amber-900',
  en_progreso: 'border-transparent bg-sky-100 text-sky-900',
  cerrado: 'border-transparent bg-emerald-100 text-emerald-900',
}

const PUNTO_ESTADO: Record<TicketEstado, string> = {
  abierto: 'bg-amber-500',
  en_progreso: 'bg-sky-500',
  cerrado: 'bg-emerald-600',
}

const COLORES_PRIORIDAD: Record<Prioridad, string> = {
  baja: 'border-border bg-muted text-muted-foreground',
  media: 'border-amber-300/70 bg-amber-50 text-amber-900',
  alta: 'border-orange-300/70 bg-orange-50 text-orange-900',
  critica: 'border-red-300/70 bg-red-50 text-red-900',
}

export function StatusBadge({ estado }: { estado: TicketEstado }) {
  return (
    <Badge
      variant="outline"
      className={`gap-1.5 font-medium ${COLORES_ESTADO[estado]}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${PUNTO_ESTADO[estado]}`}
      />
      {ETIQUETAS_ESTADO[estado]}
    </Badge>
  )
}

export function PriorityBadge({ prioridad }: { prioridad: Prioridad }) {
  return (
    <Badge
      variant="outline"
      className={`font-medium ${COLORES_PRIORIDAD[prioridad]}`}
    >
      {ETIQUETAS_PRIORIDAD[prioridad]}
    </Badge>
  )
}