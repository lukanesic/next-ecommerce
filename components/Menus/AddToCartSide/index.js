import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const AddToCartSide = ({
  show,
  setShow,
  name,
  price,
  image,
  collection,
  description1,
}) => {
  useEffect(() => {
    if (show) {
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
  }, [show])
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className='dropback'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => setShow(!show)}
          />
          <motion.div
            initial={{ opacity: 0, width: 400 }}
            animate={{ opacity: 1, width: 500 }}
            exit={{ opacity: 0, width: 400 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='add-cart'
          >
            <motion.div className='button'>
              <button onClick={() => setShow(!show)}>X</button>
            </motion.div>
            <div className='add-cart-content'>
              <div className='add-cart-product-info'>
                {/* <img src={image} alt={name} /> */}

                <div className='add-cart-p-i-c'>
                  <h2>{name}</h2>
                  <h3>Collection : {collection}</h3>
                </div>
              </div>
              <div className='add-cart-container'>
                <Link href='/cart'>
                  <button className='black'>View Cart</button>
                </Link>
                <button className='white' onClick={() => setShow(!show)}>
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

export default AddToCartSide
