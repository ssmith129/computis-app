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
    <header className="app-header flex items-center justify-between p-3 flex-shrink-0 h-auto">
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
        <NotificationsDropdown />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 focus:outline-none"
            >
              <Avatar className="h-8 w-8 bg-gray-400">
                <AvatarFallback className="bg-gray-400 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-white font-medium">John Smith</span>
              <ChevronDown className="h-4 w-4 text-white" />
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
