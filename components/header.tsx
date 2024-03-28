'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SessionProvider } from "next-auth/react"
import { NavMenu } from './navigation-menu'

export default function Header() {
  const [y, setY] = useState(0)
  console.log('Header', y)

  function handleScroll(e: Event){
    console.log('Y', y)
    const scrollY = (e.currentTarget as Window).scrollY
    setY(scrollY)
  }

  useEffect(() => {
    // FIX: This never gets called
    console.log('Y', y)
    console.log('WY', window.scrollY)
    setY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <header className={`w-full py-10 pb-7.5 fixed top-0 z-50 transition-all bg-white shadow-md ${ y > 0 ? 'bg-white dark:bg-accent py-4 shadow-md' : 'bg-transparent' }`}>
      <div className="flex justify-between container">
        <Link href="/">
          <Image
            src="/GC logo.png"
            alt="Give Credit"
            className="dark:invert"
            width={300}
            height={60}
            priority
          />
        </Link>
        <div className="flex flex-row items-center">
          <SessionProvider>
            <NavMenu />
          </SessionProvider>
        </div>
      </div>
    </header>
  )
}
