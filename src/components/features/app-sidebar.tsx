import {
SidebarHeader,
SidebarContent,
SidebarGroup,
SidebarFooter,
Sidebar,
} from '@/components/ui/sidebar'


const AppSideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}