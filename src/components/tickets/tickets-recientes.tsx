import { ArrowUpRight, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PriorityBadge, StatusBadge } from '@/components/tickets/badges'
import { getClientePorId, getConversacionesDeTicket } from '@/lib/mock'
import { formatearFecha } from '@/lib/format'
import type { Ticket } from '@/lib/types'

export function TicketsRecientes({ tickets }: { tickets: Ticket[] }) {
  return (
    <ul className="divide-y divide-border rounded-xl border bg-card">
      {tickets.map((ticket) => {
        const cliente = getClientePorId(ticket.cliente_id)
        const mensajes = getConversacionesDeTicket(ticket.id).length
        return (
          <li key={ticket.id}>
            <Link
              to={`/tickets/${ticket.id}`}
              className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/40 focus-visible:bg-muted/40"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground group-hover:underline">
                  {ticket.titulo}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {cliente?.empresa ?? cliente?.nombre} ·{' '}
                  {formatearFecha(ticket.creado_el)}
                </p>
              </div>

              <PriorityBadge prioridad={ticket.prioridad} />
              <span className="hidden sm:inline-flex">
                <StatusBadge estado={ticket.estado} />
              </span>
              <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground tabular-nums">
                <MessageSquare aria-hidden="true" className="size-3.5" />
                {mensajes}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}