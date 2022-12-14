import React from 'react'
import { GrClose } from 'react-icons/gr'
import Delivery from '../Delivery'

import { useDispatch } from 'react-redux'
import {
  addToCart,
  decreaseQty,
  removeFromCart,
} from '../../../redux/slices/cartSlice'

const Content = ({ item, cartTotalAmount }) => {
  const dispatch = useDispatch()
  const { name, description, price, qty } = item

  return (
    <div className='cart-content'>
      <div className='cart-c-info'>
        {/* <h4>{item.name}</h4>
        <p>{item.description1}</p>
        <p>{item.description2}</p> */}
        <h4>{name}</h4>
        <p>{description}</p>
        <p>{description}</p>
      </div>

      <div className='cart-price-qty'>
        <div className='c-cont price'>
          <h5>Price</h5>
          {/* <h5>${item.price}</h5> */}
          <h5>${price}</h5>
        </div>
        <div className='c-cont qty'>
          <h5>Quantity</h5>
          <div style={{ display: 'flex' }}>
            <h5
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(addToCart(item))}
            >
              +
            </h5>
            <h5>{qty}</h5>
            <h5
              style={{ cursor: 'pointer' }}
              onClick={() =>
                item.qty === 1 ? '' : dispatch(decreaseQty(item))
              }
            >
              -
            </h5>
          </div>
        </div>
      </div>

      <div className='cart-c-delivery'>
        <Delivery
          heading={'Availability'}
          description={
            'This item is in stock and will be delivered on or before 04/22/22'
          }
          cls={''}
        />
        <Delivery
          heading={'Delivery'}
          description={'Ships Free via USPS Expedited Delivery '}
          cls={''}
        />
        <Delivery
          heading={'Returns'}
          description={'This item can be returned within 30 days of delivery.'}
          cls={'b-r-none'}
        />
      </div>

      <div
        className='cart-remove'
        onClick={() => dispatch(removeFromCart(item))}
      >
        <GrClose />
        <h5>Remove </h5>
      </div>
    </div>
  )
}

export default Content
