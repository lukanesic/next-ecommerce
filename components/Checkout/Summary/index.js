import React from 'react'
import { useSelector } from 'react-redux'

const Summary = ({ onSubmit }) => {
  const { cart, cartTotalAmonut, cartTotalQuantity } = useSelector(
    (state) => state.cart
  )

  return (
    <div className='summary'>
      <h1 className='cart-h'>Summary</h1>
      {cart.map((item) => (
        <div key={item.id} className='summary-items'>
          <h4>
            {item.qty} * {item.name} - ${item.price}
          </h4>
        </div>
      ))}
      <div className='summary-sum'>
        <h2>{`Total items in cart - ${cartTotalQuantity}`}</h2>
        <h2>{`Total to pay - $ ${cartTotalAmonut}`}</h2>
      </div>

      <button type='submit' onSubmit={onSubmit}>
        Proceed to payment
      </button>
    </div>
  )
}

export default Summary
