import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  etiqueta: string
  valor: string
  detalle?: string
  icono: LucideIcon
  destacado?: boolean
  tonoIcono?: string
}

export function KpiCard({
  etiqueta,
  valor,
  detalle,
  icono: Icono,
  destacado = false,
  tonoIcono = 'bg-primary/10 text-primary',
}: KpiCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl border p-5',
        destacado
          ? 'border-primary/20 bg-primary/5'
          : 'border-border bg-card',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-muted-foreground">{etiqueta}</p>
        <span
          aria-hidden="true"
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg',
            tonoIcono,
          )}
        >
          <Icono className="size-4" />
        </span>
      </div>
      <p className="font-heading text-3xl font-semibold tracking-tight tabular-nums">
        {valor}
      </p>
      {detalle && <p className="text-xs text-muted-foreground">{detalle}</p>}
    </div>
  )
}