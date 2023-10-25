"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'

import { LogOut } from 'lucide-react'
import UserAvatar from './UserAvatar'
import { User } from '@teamhanko/hanko-elements'
import { LogUserOut } from './LogUserOut'
import HankoProfile from './HankoProfile'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hanko } from "@teamhanko/hanko-elements";

type Props = {
  user: any
}

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

const UserAccountNav = ({ user }: Props) => {

  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    );
  }, []);

  const logout = async () => {
    try {
      await hanko?.user.logout();
      router.push("/login");
      router.refresh();
      return;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="overflow-y-auto">
          <HankoProfile />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={logout}
            className="flex items-center justify-center text-red-600 cursor-pointer"
          >
            Sign Out
            <LogOut className='w-4 h-4 ml-2' />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserAccountNav