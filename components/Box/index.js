import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'

// image parametar
const Box = ({ link, name, price, image, id, placeholder }) => {
  const dispatch = useDispatch()
  const item = {
    name: name,
    price: price,
    image: image,
    id: id,
  }

  return (
    <motion.div className='home-box'>
      {/* <Link href={link}>
        <img src={image} alt={name} height={300} width={300} />
      </Link> */}
      {/* Samo dok ne resim getStaticPaths, odavde ide dodavanje u korpu */}
      <div onClick={() => dispatch(addToCart(item))}>
        {image && <img src={image} alt={name} height={300} width={300} />}
        {placeholder && (
          <div style={{ height: 300, width: 300, background: '#f0f0f0' }} />
        )}
      </div>
      <div className='home-box-info'>
        {''}
        <h3 className={placeholder ? 'plc-hld' : ''}>
          {placeholder ? 'placeholder' : name}
        </h3>
        <h5 className={placeholder ? 'plc-hld' : ''}>
          {placeholder ? 'placeholder' : `$${price}`}
        </h5>
      </div>
    </motion.div>
  )
}

export default Box
