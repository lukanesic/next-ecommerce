import React from 'react'
import Link from 'next/link'
import { getNumberWithCommas } from './../../../lib/calc'

const Total = ({ total }) => {
  getNumberWithCommas(total)

  if (!total || total === 0) {
    return (
      <div className='total'>
        <h2 style={{ textAlign: 'center' }}>Your Cart is empty</h2>
        <Link href='/'>
          <button>Return to homepage</button>
        </Link>
      </div>
    )
  }

  return (
    <div className='total'>
      <div className='sub d-fl'>
        <h3 className='left-h'>Subtotal</h3>
        <h3 className='right-h'>${getNumberWithCommas(total)}</h3>
      </div>
      <div className='ship d-fl'>
        <h3 className='left-h'>Shippment</h3>
        <h3 className='right-h'>Free</h3>
      </div>
      <div className='tot d-fl'>
        <h2>Total</h2>
        <h2>${getNumberWithCommas(total)}</h2>
      </div>

      <Link href='/checkout'>
        <button>Continue to checkout</button>
      </Link>
    </div>
  )
}

export default Total
