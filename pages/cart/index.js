import React from 'react'
import Content from '../../components/Cart/Content'
import Total from '../../components/Cart/Total'
import MainLayout from './../../layout/MainLayout'

const arr = [0, 1, 2]

const Cart = () => {
  return (
    <MainLayout>
      <h1 className='cart-h'>Your Cart</h1>
      {arr.map((item, index) => (
        <div className='cart' key={index}>
          <div className='img-placeholder' />
          <Content />
        </div>
      ))}

      <Total />
    </MainLayout>
  )
}

export default Cart
