import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";
import { AIButton } from "@/components/ui/ai-button";
import { Bell, Settings, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DashboardLayout({ children, title = "Dashboard", showAIButton = true }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  // Notification handler
  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "No new notifications",
    });
  };

  // Settings handler
  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Settings panel would open here",
    });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-accent/5">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>

          {/* Header actions */}
          <div className="flex items-center space-x-4">
            {showAIButton && <AIButton />}

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotifications}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse"></span>
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSettings}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
