import React from 'react'
import Content from '../../components/Cart/Content'
import Total from '../../components/Cart/Total'
import MainLayout from './../../layout/MainLayout'

import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const { cartTotalAmonut, cart } = useSelector((state) => state.cart)

  return (
    <MainLayout>
      <h1 className='cart-h'>Your Cart</h1>
      {cart.map((item, index) => (
        <div className='cart' key={item.id}>
          <div className='img-placeholder' />
          <Content item={item} cartTotalAmonut={cartTotalAmonut} />
        </div>
      ))}

      <Total total={cartTotalAmonut} />
    </MainLayout>
  )
}

export default Cart
