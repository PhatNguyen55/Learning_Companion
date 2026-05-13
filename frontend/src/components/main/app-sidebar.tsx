"use client"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  GraduationCap,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Vocabulary",
      url: "/dashboard/vocabulary",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Learn",
          url: "/dashboard/vocabulary/learn",
        },
        {
          title: "Review",
          url: "/dashboard/vocabulary/review",
        },
        {
          title: "My Words",
          url: "/dashboard/vocabulary/mywords",
        },
      ],
    },
    {
      title: "Grammar",
      url: "/dashboard/grammar",
      icon: SquareTerminal,
      items: [
        {
          title: "Lessons",
          url: "/dashboard/grammar/lessons",
        },
        {
          title: "Exercises",
          url: "/dashboard/grammar/exercises",
        },
        {
          title: "Progress",
          url: "/dashboard/grammar/progress",
        },
      ],
    },
    {
      title: "Speaking",
      url: "/dashboard/speaking",
      icon: AudioWaveform,
      items: [
        {
          title: "Practice",
          url: "/dashboard/speaking/practice",
        },
        {
          title: "Pronunciation",
          url: "/dashboard/speaking/pronunciation",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Preferences",
          url: "/dashboard/settings/preferences",
        },
        {
          title: "Account",
          url: "/dashboard/settings/account",
        },
      ],
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="AI Learning"
              className="group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GraduationCap className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-sidebar-foreground">
                  AI Learning
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Companion
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}