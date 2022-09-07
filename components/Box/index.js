import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

// image parametar
const Box = ({ link, name, price }) => {
  return (
    <motion.div className='home-box'>
      <Link href={link}>
        {/* <img src={image} alt={name} height={300} width={300} /> */}
        <div style={{ height: 300, width: 300, background: '#000' }} />
      </Link>
      <div className='home-box-info'>
        {''}
        <h3>{name}</h3>
        <h5>${price}</h5>
      </div>
    </motion.div>
  )
}

export default Box
