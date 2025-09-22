import type React from "react";
import { HelpCircle, Keyboard, User } from "lucide-react";

export interface HelpAccountMenuItem {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}

export const helpAccountMenuItems: HelpAccountMenuItem[] = [
  {
    title: "My Account",
    icon: User,
    href: "/my-account",
  },
  {
    title: "Help Page",
    icon: HelpCircle,
    href: "/help",
  },
  {
    title: "Keyboard Shortcuts",
    icon: Keyboard,
    href: "/keyboard-shortcuts",
  },
];
