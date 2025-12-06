import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

type SidebarLayoutProps = {
  children: React.ReactNode
}

function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">
        <header className="p-2 w-full">
          <SidebarTrigger />
        </header>
        {props.children}
      </div>
    </SidebarProvider>
  )
}

export {
  SidebarLayout,
}
