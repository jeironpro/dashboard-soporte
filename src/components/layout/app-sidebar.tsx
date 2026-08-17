import {
  Ellipsis,
  Headset,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { AGENTES, TICKETS } from '@/lib/mock'
import { getConteoPorEstado } from '@/lib/stats'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatearIniciales } from '@/lib/format'

const NAV_PRINCIPAL = [
  { titulo: 'Panel', to: '/', icon: LayoutDashboard, end: true },
  { titulo: 'Tickets', to: '/tickets', icon: Ticket, end: false },
]

const USUARIO = AGENTES[0]

export function AppSidebar() {
  const { setOpenMobile } = useSidebar()
  const location = useLocation()
  const conteoAbiertos = getConteoPorEstado(TICKETS).abierto

  return (
    <Sidebar>
      <SidebarHeader>
        <NavLink
          to="/"
          className="flex items-center gap-2 rounded-md px-2 py-1"
          onClick={() => setOpenMobile(false)}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Headset className="size-4" aria-hidden="true" />
          </span>
          <span className="grid gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">
              NubeCart · Soporte
            </span>
            <span className="text-xs text-muted-foreground">Mesa de ayuda</span>
          </span>
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_PRINCIPAL.map((item) => {
                const esActivo =
                  item.end
                    ? location.pathname === item.to
                    : location.pathname.startsWith(item.to)
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      isActive={esActivo}
                      onClick={() => setOpenMobile(false)}
                      render={<NavLink to={item.to} end={item.end} />}
                    >
                      <item.icon />
                      <span>{item.titulo}</span>
                      {item.to === '/tickets' && (
                        <SidebarMenuBadge>{conteoAbiertos}</SidebarMenuBadge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 rounded-md bg-secondary/60 p-2">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary/10 font-medium text-primary">
              {formatearIniciales(USUARIO.nombre)}
            </AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1 gap-0.5 leading-none">
            <span className="truncate text-sm font-medium">
              {USUARIO.nombre}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {USUARIO.rol}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label="Opciones de cuenta" />}
            >
              <Ellipsis aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>
                {USUARIO.nombre}
                <span className="block text-xs font-normal text-muted-foreground">
                  {USUARIO.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <Settings aria-hidden="true" />
                Preferencias
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <LogOut aria-hidden="true" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}