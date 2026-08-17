import { useParams } from 'react-router-dom'

export function TicketDetailPage() {
  const { ticketId } = useParams()

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Detalle del ticket {ticketId ?? '—'} con historial de conversaciones en
        un próximo PR.
      </p>
    </section>
  )
}