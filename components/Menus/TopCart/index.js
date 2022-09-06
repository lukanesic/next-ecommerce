import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const TopCart = ({ open, setOpen }) => {
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
            className='t-c-dropback'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => setOpen(!open)}
          />
          <motion.div
            className='top-c'
            initial={{ opacity: 0, height: '10vh' }}
            animate={{ opacity: 1, height: '40vh' }}
            exit={{ opacity: 0, height: '10vh' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className='top-c-content'>
              <h3>
                <span>12</span> Items added to your cart
              </h3>
              <Link href='/cart'>
                <button className='black'>View Cart</button>
              </Link>

              <button className='white' onClick={() => setOpen(!open)}>
                Keep Shopping
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TopCart
