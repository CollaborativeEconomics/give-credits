import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className={`w-full mt-10 py-20 bg-white dark:bg-accent`}>
      <div className="flex justify-between container">
        <div>
          <Link href="/" className='block'>
            <Image
              src="/newui/logo.png"
              alt="Give Credit"
              className="dark:invert"
              width={300}
              height={60}
              priority
            />
          </Link>
          <p className='ml-16'>by Center For Collaborative Economics</p>
        </div>
        <div>
          <h1 className='font-bold'>Know Us:</h1>
          <Link href="/" className='block'>Our Mission</Link>
          <Link href="/" className='block'>Our Partners</Link>
          <Link href="/" className='block'>Privacy Policy</Link>
          <Link href="/" className='block'>Terms and Conditions</Link>
        </div>
        <div>
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
