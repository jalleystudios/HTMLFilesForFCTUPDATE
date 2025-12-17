import { Calendar, ChevronDown, LayoutGrid, Mail, Package, Settings, Star, Tag, Ticket, Users, Zap } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const mainNavItems = [
  { title: 'All Events', url: '/', icon: LayoutGrid },
  { title: 'Featured', url: '/featured', icon: Star },
  { title: 'Curated Lists', url: '/curated', icon: Zap },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
];

const templateSubItems = [
  { title: 'GROUP', url: '/templates?layout=group', icon: Package, color: 'text-amber-500' },
  { title: 'INDIVIDUAL', url: '/templates?layout=individual', icon: Ticket, color: 'text-blue-500' },
  { title: 'ADD-ONS', url: '/templates?layout=add-on', icon: Tag, color: 'text-emerald-500' },
];

const toolsNavItems = [
  { title: 'Subscribers', url: '/subscribers', icon: Users },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const isTemplatesActive = location.pathname === '/templates';
  const [templatesOpen, setTemplatesOpen] = useState(isTemplatesActive);

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gold flex items-center justify-center">
            <span className="font-display font-bold text-lg text-primary-foreground">FC</span>
          </div>
          <div>
            <h1 className="font-display font-semibold text-lg text-sidebar-foreground">FCT Update</h1>
            <p className="text-xs text-muted-foreground">Event Curation</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground uppercase text-xs tracking-wider px-6">
            Events
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="px-6">
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 py-2.5 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="text-gold bg-sidebar-accent"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-muted-foreground uppercase text-xs tracking-wider px-6">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Email Templates - Collapsible with Sub-items */}
              <SidebarMenuItem>
                <Collapsible open={templatesOpen} onOpenChange={setTemplatesOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      className={cn(
                        "px-6 w-full flex items-center justify-between py-2.5 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                        isTemplatesActive && "text-gold bg-sidebar-accent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5" />
                        <span>Email Templates</span>
                      </div>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        templatesOpen && "rotate-180"
                      )} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-8 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
                      {templateSubItems.map((item) => (
                        <SidebarMenuButton key={item.title} asChild className="px-3">
                          <NavLink
                            to={item.url}
                            className={cn(
                              "flex items-center gap-2 py-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors rounded-md",
                              item.color
                            )}
                            activeClassName="bg-sidebar-accent font-medium"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Other Tools */}
              {toolsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="px-6">
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 py-2.5 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="text-gold bg-sidebar-accent"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground">
          <p>First Class Tixx</p>
          <p className="text-gold">Admin Dashboard</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
