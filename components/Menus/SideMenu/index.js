import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
// import { useSelector } from 'react-redux'

const SideMenu = ({ open, setOpen }) => {
  //   const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (open) {
      const width = document.body.clientWidth
      document.body.style.overflowY = 'hidden'
      document.body.style.width = `${width}px`
    } else {
      document.body.style.overflowY = 'visible'
      document.body.style.width = `auto`
    }

    return () => {
      document.body.style.overflowY = 'visible'
      document.body.style.width = `auto`
    }
  }, [open])
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className='side-dropback uni-drop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => setOpen(!open)}
          />
          <motion.div
            initial={{ opacity: 0, width: '55vw' }}
            animate={{ opacity: 1, width: '70vw' }}
            exit={{ opacity: 0, width: '55vw' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='side-menu'
          >
            <motion.div className='close-button'>
              <button onClick={() => setOpen(!open)}>X</button>
            </motion.div>
            <div className='side-menu-content'>
              <Link href='/'>
                <li>Interiors (404)</li>
              </Link>
              <Link href='/'>
                <li>Beach House (404)</li>
              </Link>
              <Link href='/'>
                <li>Fire & Heat (404)</li>
              </Link>
              <Link href='/'>
                <li>Ski House (404)</li>
              </Link>
              <Link href='/'>
                <li>Lightning (404)</li>
              </Link>
              <Link href='/'>
                <li>Sale (404)</li>
              </Link>
            </div>

            <div className='side-menu-content'>
              <Link href='/'>
                <li>About Us (404)</li>
              </Link>
              <Link href='/'>
                <li>Contact (404)</li>
              </Link>
              <Link href='/'>
                <li>Our Vision (404)</li>
              </Link>
            </div>

            <div className='side-menu-content' style={{ borderBottom: 'none' }}>
              <Link href='/account'>
                <li>Account</li>
              </Link>
            </div>

            {/* <div className='side-menu-content' style={{ borderBottom: 'none' }}>
              {user.isAdmin && (
                <Link href='/admin'>
                  <li>Admin</li>
                </Link>
              )}

              {Object.keys(user).length !== 0 && !user.isAdmin && (
                <Link href='/account'>
                  <li>Account</li>
                </Link>
              )}

              {Object.keys(user).length === 0 && (
                <>
                  <Link href='/login'>
                    <li>Sign In</li>
                  </Link>
                </>
              )}
            </div> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SideMenu
