import React, { useState } from 'react'
import Link from 'next/link'

import { BsSearch } from 'react-icons/bs'
import { AiOutlineShoppingCart } from 'react-icons/ai'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const Large = ({ cls, open, setOpen, openSearch, setOpenSearch }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    router.replace('/')
    await signOut({ redirect: false })
  }

  console.log(session)

  return (
    <nav className={`lg-nav ${cls}`}>
      <div className='logo'>
        <Link href='/'>
          <h1>Furniture</h1>
        </Link>
      </div>

      <div className='lg-nav-li'>
        <ul>
          <li>Interiors</li>
          <li>Beach House</li>
          <li>Fire & Heat</li>
          <li>Ski House</li>
          <li>Lightning</li>
          <li>Sale</li>
        </ul>
      </div>

      <div className='lg-nav-i'>
        {session &&
          (session.user.role === 'admin' ? (
            <Link href='/admin'>Admin</Link>
          ) : (
            <Link href='/account'>Account</Link>
          ))}
        {session && (
          <a style={{ cursor: 'pointer' }} onClick={handleSignOut}>
            Logout
          </a>
        )}

        {!session && <Link href='/login'>Login</Link>}

        <BsSearch onClick={() => setOpenSearch(!openSearch)} />
        <AiOutlineShoppingCart onClick={() => setOpen(!open)} />
      </div>
    </nav>
  )
}

export default Large
