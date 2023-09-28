import Link from "next/link"

const Header = () => {
  return (
    <header 
    className="sticky top-0 z-50 px-1 py-2 bg-primary text-primary-foreground"
    >
      <nav className="flex items-baseline gap-2">
       <Link
       className="text-xl lg:text-2xl"
       href="/">Geomatch Showdown</Link>
       <ul
       className="flex "
       >
        <li><Link href="/about">About</Link></li>
        {/* TODO: Add website color theme logic */}
        <li>Theme</li>
       </ul>
      </nav>
    </header>
  )
}

export default Header