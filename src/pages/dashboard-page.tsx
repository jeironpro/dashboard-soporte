import {
  CircleAlert,
  CircleCheckBig,
  CircleDashed,
  Timer,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { KpiCard } from '@/components/kpis/kpi-card'
import { DistribucionCategoriaChart } from '@/components/charts/distribucion-categoria-chart'
import { TicketsPorDiaChart } from '@/components/charts/tickets-por-dia-chart'
import { TicketsRecientes } from '@/components/tickets/tickets-recientes'
import {
  getConteoPorEstado,
  getDistribucionPorCategoria,
  getSatisfaccionPromedio,
  getTicketsPorDia,
  getTicketsRecientes,
  getTiempoRespuestaPromedioHoras,
  getTiempoResolucionPromedioHoras,
} from '@/lib/stats'
import { TICKETS } from '@/lib/mock'
import { formatearDuracionHoras } from '@/lib/format'

export function DashboardPage() {
  const conteo = getConteoPorEstado(TICKETS)
  const respuestaPromedio = getTiempoRespuestaPromedioHoras(TICKETS)
  const resolucionPromedio = getTiempoResolucionPromedioHoras(TICKETS)
  const satisfaccion = getSatisfaccionPromedio(TICKETS)
  const serie = getTicketsPorDia(TICKETS, 30)
  const distribucionCategoria = getDistribucionPorCategoria(TICKETS)
  const recientes = getTicketsRecientes(TICKETS, 5)

  const conRespuesta = TICKETS.filter(
    (ticket) => ticket.primera_respuesta_el,
  ).length

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          etiqueta="Tickets abiertos"
          valor={String(conteo.abierto)}
          detalle="Esperando primera respuesta"
          icono={CircleAlert}
          destacado
          tonoIcono="bg-amber-100 text-amber-800"
        />
        <KpiCard
          etiqueta="En progreso"
          valor={String(conteo.en_progreso)}
          detalle="Siendo atendidos por el equipo"
          icono={CircleDashed}
          tonoIcono="bg-sky-100 text-sky-800"
        />
        <KpiCard
          etiqueta="Cerrados"
          valor={String(conteo.cerrado)}
          detalle={`CSAT ${satisfaccion ?? '—'} de 5`}
          icono={CircleCheckBig}
          tonoIcono="bg-emerald-100 text-emerald-800"
        />
        <KpiCard
          etiqueta="Tiempo de respuesta promedio"
          valor={formatearDuracionHoras(respuestaPromedio)}
          detalle={`Basado en ${conRespuesta} primeras respuestas`}
          icono={Timer}
          tonoIcono="bg-primary/10 text-primary"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tickets por día</CardTitle>
            <CardDescription>
              Creación de tickets por estado en los últimos 30 días
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TicketsPorDiaChart datos={serie} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Por categoría</CardTitle>
            <CardDescription>
              Distribución del volumen actual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DistribucionCategoriaChart distribucion={distribucionCategoria} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Tickets recientes</CardTitle>
            <CardDescription>
              Últimas solicitudes recibidas · tiempo medio de resolución{' '}
              {formatearDuracionHoras(resolucionPromedio)}{' '}
              {satisfaccion !== null ? `· CSAT ${satisfaccion}/5` : ''}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" nativeButton={false} render={<Link to="/tickets" />}>
            Ver todos
          </Button>
        </CardHeader>
        <CardContent>
          <TicketsRecientes tickets={recientes} />
        </CardContent>
      </Card>
    </section>
  )
}