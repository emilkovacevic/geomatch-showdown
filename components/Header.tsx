import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const Header = () => {
  return (
    <header 
    className="sticky top-0 z-50 px-1 py-2 bg-primary text-primary-foreground"
    >
      <nav className="flex justify-between gap-2">
       <Link
       className="text-xl lg:text-2xl"
       href="/">Geomatch Showdown</Link>
       <ul
       className="flex items-center gap-2"
       >
        <li><Link href="/about">About</Link></li>
        <li><ThemeToggle/></li>
       </ul>
      </nav>
    </header>
  )
}

export default Header