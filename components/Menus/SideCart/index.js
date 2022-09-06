import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// import { useSelector } from 'react-redux'

// import { getTotal } from '../../redux/slices/cartSlice'
// import { useDispatch } from 'react-redux'

const SideCart = ({ open, setOpen }) => {
  //   const dispatch = useDispatch()

  //   const { cart } = useSelector((state) => state.cart)

  //   const { cartTotalQuantity } = useSelector((state) => state.cart)

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

  //   useEffect(() => {
  //     dispatch(getTotal())
  //   }, [dispatch, cart])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className='dropback'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => setOpen(!open)}
          />
          <motion.div
            initial={{ opacity: 0, width: 400 }}
            animate={{ opacity: 1, width: 500 }}
            exit={{ opacity: 0, width: 400 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='menu'
          >
            <motion.div className='button'>
              <button onClick={() => setOpen(!open)}>X</button>
            </motion.div>
            <div className='side-cart-content'>
              <div className='side-cart-container'>
                {/* Napravi uslov gde neces moci da udjes na cart link ako imas 0 items in cart */}
                {/* <h2 style={{ marginBottom: '2rem' }}>{cartTotalQuantity}</h2> */}
                <h2 style={{ marginBottom: '2rem' }}>CTQ</h2>
                <h3>Items added to your cart</h3>
                <Link href='/cart'>
                  <button className='black'>View Cart</button>
                </Link>

                <button className='white' onClick={() => setOpen(!open)}>
                  Keep Shopping
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SideCart
