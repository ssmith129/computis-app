import type React from "react";
import { HelpCircle, Keyboard, User } from "lucide-react";

export interface HelpAccountMenuItem {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const helpAccountMenuItems: HelpAccountMenuItem[] = [
  {
    title: "My Account",
    icon: User,
  },
  {
    title: "Help Page",
    icon: HelpCircle,
  },
  {
    title: "Keyboard Shortcuts",
    icon: Keyboard,
  },
];
