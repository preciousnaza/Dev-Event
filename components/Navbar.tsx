import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
  return (
   <header>
      <nav>
        <Link href='/' className="logo " >
          <Image src='/icons/logo.png' width={24} height={24} alt="Logo"/>
          <p>DevEvents</p>
        </Link>

        <ul>
          <Link href="/">Home</Link>
          <Link  href="/Events">Events</Link>
          <Link  href="/">create Events</Link>
        </ul>
      </nav>
   </header>
  )
}

export default Navbar