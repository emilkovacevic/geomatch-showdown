import Link from "next/link"
import { getServerSession } from 'next-auth'
import ThemeToggle from "../theme/ThemeToggle"
import { options } from "@/app/api/auth/[...nextauth]/options"
import UserMenu from "./UserMenu"

const Header = async () => {
  const session = await getServerSession(options)
  return (
    <header 
    className="sticky top-0 z-50 px-1 py-2 bg-primary text-primary-foreground"
    >
      <nav className="flex items-center justify-between gap-2">
       <Link
       className="text-lg lg:text-xl"
       href="/">Geomatch Showdown</Link>
       <ul
       className="flex items-center gap-2"
       >
        {
          session
          ?
            <li><UserMenu session={session} /></li>
          :
          <>
            <li><Link href="/signin">SignIn</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><ThemeToggle/></li>
          </>
        }
       </ul>
      </nav>
    </header>
  )
}

export default Header