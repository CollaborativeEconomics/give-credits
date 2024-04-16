import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className={`w-full mt-10 py-20 bg-white dark:bg-accent`}>
      <div className="flex flex-row sm:flex-col md:flex-col lg:flex-row xl:flex-row justify-between container">
        <div className="sm:text-center md:text-center">
          <Link href="/" className='block text-center'>
            <Image
              src="/newui/logo.png"
              alt="Give Credit"
              className="dark:invert mx-auto"
              width={300}
              height={60}
              priority
            />
          </Link>
          <p className="ml-16 sm:ml-0 md:ml-0">by Center For Collaborative Economics</p>
        </div>
        <div className="sm:mt-8 sm:text-center md:mt-8 md:text-center">
          <h1 className='font-bold'>Know Us:</h1>
          <Link href="/" className='block'>Our Mission</Link>
          <Link href="/" className='block'>Our Partners</Link>
          <Link href="/" className='block'>Privacy Policy</Link>
          <Link href="/" className='block'>Terms and Conditions</Link>
        </div>
        <div className="sm:mt-8 sm:text-center md:mt-8 md:text-center">
          <h1 className='font-bold'>Follow Us:</h1>
          <Link href="/" className='block'>• Discord</Link>
          <Link href="/" className='block'>• Twitter</Link>
          <Link href="/" className='block'>• Facebook</Link>
          <Link href="/" className='block'>• Instagram</Link>
        </div>
      </div>
    </footer>
  )
}
