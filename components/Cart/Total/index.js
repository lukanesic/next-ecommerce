import React from 'react'
import Link from 'next/link'

const Total = ({ total }) => {
  // const { cartTotalAmonut } = useSelector((state) => state.cart)

  const getNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
