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

/**
 * DashboardHeader Component
 *
 * Fixed header with:
 * - Compact search bar (reduced height)
 * - Notifications dropdown
 * - User profile dropdown
 *
 * Responsive Behavior:
 * - Mobile (<640px): Compact layout, minimal padding
 * - Tablet (640px-1024px): Medium spacing, search expands
 * - Desktop (>1024px): Full layout with all elements
 *
 * Z-Index: Inherits from parent (z-50)
 * Height: Fixed at 3rem (48px) - reduced from 3.5rem for slimmer profile
 */
export function DashboardHeader() {
  return (
    <header
      className="
        app-header
        flex
        items-center
        justify-between
        gap-2 sm:gap-3
        px-2 sm:px-3
        py-1.5 sm:py-2
        flex-shrink-0
        h-[3rem]
        overflow-x-hidden
        w-full
      "
      role="banner"
      aria-label="Main navigation header"
    >
      {/*
        Search Bar - Compact Design
        Mobile: 200px max-width
        Tablet: 384px (24rem) max-width
        Desktop: 448px (28rem) max-width
        Large: 512px (32rem) max-width
        Height: 2rem (32px) - slimmed down
      */}
      <div
        className="
          flex
          items-center
          bg-sidebar-accent
          rounded-md
          px-2 sm:px-2.5
          py-1
          flex-1
          min-w-0
          max-w-[200px]
          sm:max-w-[280px]
          md:max-w-sm
          lg:max-w-md
          xl:max-w-lg
          h-8
          transition-all
          duration-200
        "
        role="search"
      >
        <Search
          className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0 mr-2 sm:mr-3"
          aria-hidden="true"
        />
        <Input
          placeholder="Search..."
          className="
            bg-transparent
            border-none
            text-white
            placeholder:text-gray-300
            focus-visible:ring-0
            focus-visible:ring-offset-0
            p-0
            min-w-0
            text-sm sm:text-base
          "
          aria-label="Search"
        />
      </div>

      {/*
        Right Side - Notifications and User Profile
        - Responsive gap (0.5rem on mobile, 1rem on tablet, 1.5rem on desktop)
        - Items never wrap to new line
      */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 shrink-0">
        {/* Notifications - Always visible */}
        <NotificationsDropdown />

        {/*
          User Profile Dropdown
          - Avatar always visible (32px mobile, 36px desktop)
          - Username hidden on mobile/tablet, visible on large screens
        */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="
                flex
                items-center
                gap-1 sm:gap-2
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                rounded-md
                shrink-0
                transition-all
                hover:opacity-80
              "
              aria-label="User menu"
              aria-haspopup="menu"
            >
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 bg-gray-400">
                <AvatarFallback className="bg-gray-400 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-white font-medium text-sm hidden lg:inline-block">
                John Smith
              </span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-white hidden lg:inline-block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 sm:w-56"
            sideOffset={8}
          >
            {helpAccountMenuItems.map((item) => (
              <DropdownMenuItem
                key={item.title}
                className="cursor-pointer"
                asChild
              >
                <Link to={item.href} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
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
