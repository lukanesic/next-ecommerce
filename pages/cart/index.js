import React, { useEffect } from 'react'
import Content from '../../components/Cart/Content'
import Total from '../../components/Cart/Total'
import MainLayout from './../../layout/MainLayout'

import { useDispatch, useSelector } from 'react-redux'
import { getTotal } from '../../redux/slices/cartSlice'

const Cart = () => {
  const { cartTotalAmonut, cart, cartTotalQuantity } = useSelector(
    (state) => state.cart
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotal())
  }, [cartTotalAmonut, cart, cartTotalQuantity])

  return (
    <MainLayout>
      <h1 className='cart-h'>Your Cart</h1>
      {cart.map((item, index) => (
        <div className='cart' key={item.id}>
          <img src={item.image} alt={item.name} />
          <Content
            item={item}
            cartTotalAmonut={cartTotalAmonut}
            cartTotalQuantity={cartTotalQuantity}
          />
        </div>
      ))}

      <Total total={cartTotalAmonut} />
    </MainLayout>
  )
}

export default Cart
