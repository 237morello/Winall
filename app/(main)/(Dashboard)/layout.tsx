import {SidebarProvider,SidebarTrigger } from  "@/components/ui/sidebar"
import {AppSidebar} from "@/components/dash/app-sidebar"

interface DashProps {
  children: React.ReactNode
}

export default function layout({children}:DashProps) {
  return (
    <>
     <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
     </SidebarProvider>
    </>
  )
}
