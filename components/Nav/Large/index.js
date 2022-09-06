import React from 'react'
import Link from 'next/link'

import { BsSearch } from 'react-icons/bs'
import { AiOutlineShoppingCart } from 'react-icons/ai'

// import { useSelector } from 'react-redux'

const Large = ({ cls, open, setOpen, openSearch, setOpenSearch }) => {
  //   const { user } = useSelector((state) => state.user)

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

      {/* <div className='lg-nav-i'>
        {Object.keys(user).length !== 0 && user.isAdmin && (
          <Link to='/admin'>Admin</Link>
        )}
        {Object.keys(user).length !== 0 && !user.isAdmin && (
          <Link to='/account'>Account</Link>
        )}
        {Object.keys(user).length === 0 && <Link to='/login'>Sign In</Link>}

        {!user.isAdmin && (
          <>
            <BsSearch onClick={() => setOpenSearch(!openSearch)} />
            <AiOutlineShoppingCart onClick={() => setOpen(!open)} />
          </>
        )}
      </div> */}
      <div className='lg-nav-i'>
        <Link href='/account'>Account</Link>
        <BsSearch onClick={() => setOpenSearch(!openSearch)} />
        <AiOutlineShoppingCart onClick={() => setOpen(!open)} />
      </div>
    </nav>
  )
}

export default Large
