"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconCreditCard, IconUserCircle, IconLogout, IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "next-themes"

export function UserNav() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 p-2 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
            <AvatarFallback className="text-sm">AD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Admin User</p>
            <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem><IconUserCircle />Account</DropdownMenuItem>
          <DropdownMenuItem><IconCreditCard />Billing</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme(theme => theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <IconMoon /> : <IconSun />}
            {theme === 'light' ? 'Dark' : 'Light'} mode
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem><IconLogout />Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
