import { Search, ChevronDown, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationsDropdown } from "@/components/dashboard/notifications-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { helpAccountMenuItems } from "@/components/dashboard/menu-config";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  return (
    <header className="app-header flex items-center justify-between gap-3 p-3 flex-shrink-0 h-auto overflow-x-hidden">
      {/* Search Bar - Responsive width */}
      <div className="flex items-center bg-sidebar-accent rounded-lg px-3 flex-1 min-w-0 max-w-[280px] md:max-w-sm lg:max-w-md xl:max-w-lg h-auto">
        <Search className="h-5 w-5 text-white shrink-0 mr-3" />
        <Input
          placeholder="Search..."
          className="bg-transparent border-none text-white placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 min-w-0"
        />
      </div>

      {/* Right side - Notifications and User */}
      <div className="flex items-center gap-3 lg:gap-6 shrink-0">
        {/* Notifications */}
        <NotificationsDropdown />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 focus:outline-none shrink-0"
            >
              <Avatar className="h-8 w-8 bg-gray-400">
                <AvatarFallback className="bg-gray-400 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-white font-medium hidden lg:inline-block">John Smith</span>
              <ChevronDown className="h-4 w-4 text-white hidden lg:inline-block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {helpAccountMenuItems.map((item) => (
              <DropdownMenuItem
                key={item.title}
                className="cursor-pointer"
                asChild
              >
                <Link to={item.href} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
