import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOutBtn from "../SignOut";
import Link from "next/link";
import { Session } from "next-auth";
import ThemeToggle from "../theme/ThemeToggle";

interface UserMenuProps {
    session: Session
}

const UserMenu = ({session}: UserMenuProps) => {
  return (
    <Menubar className="p-0 m-0 bg-transparent border-none h-fit">
      <MenubarMenu>
        <MenubarTrigger>
          <Avatar>
            <AvatarImage src={session.user.image} alt={session.user.email} />
            <AvatarFallback>{session.user.email.slice(0,6)}</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem><Link href="/profile">Profile</Link></MenubarItem>
          <MenubarSeparator />
          <MenubarItem><Link href="/about">About</Link></MenubarItem>
          <MenubarSeparator />
          <MenubarItem><SignOutBtn/></MenubarItem>
          <MenubarSeparator />
          <MenubarItem><ThemeToggle/></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserMenu;
