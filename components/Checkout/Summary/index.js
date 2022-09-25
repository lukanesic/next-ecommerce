import React from 'react'

import { getNumberWithCommas } from '../../../lib/calc'

const Summary = ({ onSubmit, cart, cartTotalAmonut, cartTotalQuantity }) => {
  return (
    <div className='summary'>
      <h1 className='cart-h'>Summary</h1>
      {cart.map((item) => (
        <div key={item._id} className='summary-items'>
          <h4>
            {item.qty} * {item.name} - ${item.price}
          </h4>
        </div>
      ))}
      <div className='summary-sum'>
        <h2>{`Total items in cart - ${cartTotalQuantity}`}</h2>
        <h2>{`Total to pay - $ ${getNumberWithCommas(cartTotalAmonut)}`}</h2>
      </div>

      {/* Za sad je Order, ka napravim payment sistem, onda ide kroz to */}
      {/* <button type='submit'>Proceed to payment</button> */}
      <button type='submit'>Make your order</button>
    </div>
  )
}

export default Summary
