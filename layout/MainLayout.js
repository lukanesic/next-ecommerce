import React, { useState } from 'react'
// import {AddSideCart} from './../components/Menus/AddSideCart';
import Search from '../components/Menus/Search'
import SideCart from '../components/Menus/SideCart'
import SideMenu from '../components/Menus/SideMenu'
import TopCart from '../components/Menus/TopCart'

import Large from '../components/Nav/Large'
import Small from '../components/Nav/Small'

const MainLayout = ({ children, cls, hide }) => {
  const [openSideC, setOpenSideC] = useState(false)
  const [openTopC, setOpenTopC] = useState(false)
  const [openSideM, setOpenSideM] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  return (
    <>
      <Small
        openSideM={openSideM}
        setOpenSideM={setOpenSideM}
        openTopC={openTopC}
        setOpenTopC={setOpenTopC}
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />
      <Large
        hide={hide}
        cls={cls}
        open={openSideC}
        setOpen={setOpenSideC}
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />

      <SideCart open={openSideC} setOpen={setOpenSideC} />
      <Search open={openSearch} setOpen={setOpenSearch} />

      {/* MOBILE MENU */}
      <SideMenu open={openSideM} setOpen={setOpenSideM} />
      {/* MOBILE CART */}
      <TopCart open={openTopC} setOpen={setOpenTopC} />

      {children}
    </>
  )
}

export default MainLayout
