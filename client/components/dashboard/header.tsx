import { Search, Bell, ChevronDown, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between p-3 bg-sidebar flex-shrink-0 h-auto">
      {/* Search Bar */}
      <div className="flex items-center bg-sidebar-accent rounded-lg px-3 w-full max-w-lg h-auto self-center">
        <Search className="h-5 w-5 text-white mr-3" />
        <Input
          placeholder="Search..."
          className="bg-transparent border-none text-white placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
        />
      </div>

      {/* Right side - Notifications and User */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-sidebar-accent"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-gray-400">
            <AvatarFallback className="bg-gray-400 text-white">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-white font-medium">John Smith</span>
          <ChevronDown className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
}
