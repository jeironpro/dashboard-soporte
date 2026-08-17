import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/app-shell'
import { DashboardPage } from '@/pages/dashboard-page'
import { TicketsPage } from '@/pages/tickets-page'
import { TicketDetailPage } from '@/pages/ticket-detail-page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets/:ticketId" element={<TicketDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App