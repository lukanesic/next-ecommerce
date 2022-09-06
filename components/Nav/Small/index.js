import React from 'react'
import Link from 'next/link'

import { BsSearch } from 'react-icons/bs'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'

const Small = ({
  cls,
  openSideM,
  setOpenSideM,
  openTopC,
  setOpenTopC,
  openSearch,
  setOpenSearch,
}) => {
  return (
    <nav className={`sm-nav ${cls}`}>
      <div className='sm-nav-logo'>
        <Link href='/'>
          <h1>Furniture</h1>
        </Link>
      </div>

      <div className='sm-nav-li'>
        <BsSearch className='sm-i' onClick={() => setOpenSearch(!openSearch)} />

        <AiOutlineShoppingCart
          className='sm-i'
          onClick={() => setOpenTopC(!openTopC)}
        />

        <GiHamburgerMenu
          className='sm-i '
          onClick={() => setOpenSideM(!openSideM)}
        />
      </div>
    </nav>
  )
}

export default Small
